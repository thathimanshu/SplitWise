from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from collections import defaultdict
from ..database import get_db
from ..models import Group, User, Expense, ExpenseSplit

from ..schemas import GroupCreate, GroupResponse, UserResponse

router = APIRouter(prefix="/groups", tags=["Groups"])

@router.get("/{group_id}/balances")
def get_group_balances(group_id: int, db: Session = Depends(get_db)):
    group = db.query(Group).filter(Group.id == group_id).first()
    if not group:
        raise HTTPException(status_code=404, detail="Group not found")

    balances = defaultdict(float)

    expenses = db.query(Expense).filter(Expense.group_id == group_id).all()
    for expense in expenses:
        splits = db.query(ExpenseSplit).filter(ExpenseSplit.expense_id == expense.id).all()
        for split in splits:
            if split.user_id != expense.paid_by:
                balances[(split.user_id, expense.paid_by)] += split.amount

    # Final netting
    net_balances = defaultdict(float)
    for (debtor, creditor), amount in balances.items():
        reverse = balances.get((creditor, debtor), 0)
        net = amount - reverse
        if net > 0:
            net_balances[(debtor, creditor)] = net

    result = []
    for (debtor, creditor), amount in net_balances.items():
        debtor_user = db.query(User).get(debtor)
        creditor_user = db.query(User).get(creditor)
        result.append({
            "from": debtor_user.name,
            "to": creditor_user.name,
            "amount": round(amount, 2)
        })

    return result


@router.post("/", response_model=GroupResponse)
def create_group(payload: GroupCreate, db: Session = Depends(get_db)):
    group = Group(name=payload.name)
    db.add(group)
    db.commit()
    db.refresh(group)

    users = []
    for user_name in payload.user_ids:
        user = db.query(User).filter_by(name=user_name).first()
        if not user:
            user = User(name=user_name)
            db.add(user)
            db.commit()
            db.refresh(user)
        users.append(user)

    group.users = users  # ✅ This links the users to the group
    db.commit()

    return {
        "id": group.id,
        "name": group.name,
        "users": [{"id": user.id, "name": user.name} for user in users]
    }

@router.get("/")
def get_all_groups(db: Session = Depends(get_db)):
    groups = db.query(Group).all()
    return [{"id": g.id, "name": g.name} for g in groups]

# GET /groups/{group_id}
@router.get("/{group_id}", response_model=GroupResponse)
def get_group(group_id: int, db: Session = Depends(get_db)):
    group = db.query(Group).filter(Group.id == group_id).first()
    if not group:
        raise HTTPException(status_code=404, detail="Group not found")
    
    return {
        "id": group.id,
        "name": group.name,
        "users": [{"id": user.id, "name": user.name} for user in group.users]
    }
