from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from ..database import get_db
from ..models import Group, User, Expense, ExpenseSplit
from ..schemas import ExpenseCreate, ExpenseResponse

router = APIRouter(prefix="/groups", tags=["Expenses"])

@router.post("/{group_id}/expenses", response_model=ExpenseResponse)
def add_expense(group_id: int, payload: ExpenseCreate, db: Session = Depends(get_db)):
    group = db.query(Group).filter(Group.id == group_id).first()
    if not group:
        raise HTTPException(status_code=404, detail="Group not found")

    if payload.paid_by not in [u.id for u in group.users]:
        raise HTTPException(status_code=400, detail="Payer is not a member of the group")

    total_amount = payload.amount
    expense = Expense(
        description=payload.description,
        amount=total_amount,
        paid_by=payload.paid_by,
        group_id=group_id
    )
    db.add(expense)
    db.commit()
    db.refresh(expense)

    splits = []
    if payload.split_type == "equal":
        members = group.users
        per_person = round(total_amount / len(members), 2)
        for user in members:
            splits.append(ExpenseSplit(user_id=user.id, amount=per_person, expense_id=expense.id))
    elif payload.split_type == "percentage":
        total_percentage = sum(split.percentage for split in payload.splits)
        if total_percentage != 100:
            raise HTTPException(status_code=400, detail="Total percentage must equal 100%")
        for split in payload.splits:
            user = db.query(User).filter_by(id=split.user_id, group_id=group_id).first()
            if not user:
                raise HTTPException(status_code=400, detail=f"User {split.user_id} not in group")
            amt = round((split.percentage / 100) * total_amount, 2)
            splits.append(ExpenseSplit(user_id=split.user_id, amount=amt, expense_id=expense.id))
    else:
        raise HTTPException(status_code=400, detail="Invalid split type")

    db.add_all(splits)
    db.commit()

    return {
        "id": expense.id,
        "description": expense.description,
        "amount": expense.amount,
        "paid_by": expense.paid_by,
        "splits": [{"user_id": s.user_id, "amount": s.amount} for s in splits]
    }

@router.get("/{group_id}/expenses")
def get_expenses(group_id: int, db: Session = Depends(get_db)):
    group = db.query(Group).filter(Group.id == group_id).first()
    if not group:
        raise HTTPException(status_code=404, detail="Group not found")

    expenses = db.query(Expense).filter(Expense.group_id == group_id).all()
    result = []
    for exp in expenses:
        splits = db.query(ExpenseSplit).filter(ExpenseSplit.expense_id == exp.id).all()
        result.append({
            "id": exp.id,
            "description": exp.description,
            "amount": exp.amount,
            "paid_by": exp.paid_by,
            "splits": [{"user_id": s.user_id, "amount": s.amount} for s in splits]
        })

    return result
