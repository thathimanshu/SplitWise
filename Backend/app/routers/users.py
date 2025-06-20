from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from collections import defaultdict
from ..database import get_db
from ..models import User, Expense, ExpenseSplit

router = APIRouter(prefix="/users", tags=["Users"])

@router.get("/{user_id}/balances")
def get_user_balances(user_id: int, db: Session = Depends(get_db)):
    print("hehee")
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    balances = defaultdict(float)

    for group in user.groups:
        expenses = db.query(Expense).filter(Expense.group_id == group.id).all()
        for expense in expenses:
            splits = db.query(ExpenseSplit).filter(ExpenseSplit.expense_id == expense.id).all()
            for split in splits:
                # User owes someone
                if split.user_id == user_id and expense.paid_by != user_id:
                    balances[expense.paid_by] += split.amount
                # Others owe user
                elif expense.paid_by == user_id and split.user_id != user_id:
                    balances[split.user_id] -= split.amount

    summary = []
    for other_user_id, net_amount in balances.items():
        if abs(net_amount) < 0.01:
            continue  # skip near-zero balances

        other_user = db.query(User).get(other_user_id)
        if net_amount > 0:
            # User owes other_user
            summary.append({
                "from": "you",
                "to": other_user.name,
                "amount": round(net_amount, 2)
            })
        else:
            # Other_user owes you
            summary.append({
                "from": other_user.name,
                "to": "you",
                "amount": round(-net_amount, 2)
            })

    return summary
