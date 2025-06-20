from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from collections import defaultdict
from ..database import get_db
from ..models import Group, User, Expense, ExpenseSplit

router = APIRouter(prefix="/balances", tags=["Balances"])

@router.get("/test")
def fn():
    return "hehe"
@router.get("/users/{user_id}")
def get_user_balances(user_id: int, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    balances = defaultdict(float)
    groups = user.groups
    for group in groups:
        expenses = db.query(Expense).filter(Expense.group_id == group.id).all()
        for expense in expenses:
            splits = db.query(ExpenseSplit).filter(ExpenseSplit.expense_id == expense.id).all()
            for split in splits:
                if split.user_id == user_id and expense.paid_by != user_id:
                    balances[(user_id, expense.paid_by)] += split.amount
                elif expense.paid_by == user_id and split.user_id != user_id:
                    balances[(split.user_id, user_id)] -= split.amount

    # Netting
    result = []
    for (debtor, creditor), amount in balances.items():
        net = round(amount, 2)
        if net > 0:
            debtor_user = db.query(User).get(debtor)
            creditor_user = db.query(User).get(creditor)
            result.append({
                "from": debtor_user.name,
                "to": creditor_user.name,
                "amount": net
            })

    return result
