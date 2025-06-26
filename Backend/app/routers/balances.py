from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from collections import defaultdict
from ..database import get_db
from ..models import Group, User, Expense, ExpenseSplit

router = APIRouter(prefix="/balances", tags=["Balances"])

@router.get("/users/{user_id}")
def get_user_balances(user_id: int, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    balances = defaultdict(float)


    for group in user.groups:
        expenses = db.query(Expense).filter(Expense.group_id == group.id).all()
        for expense in expenses:
            splits = db.query(ExpenseSplit).filter(ExpenseSplit.expense_id == expense.id).all()
            for split in splits:
                # only track debtor → creditor amounts
                if split.user_id != expense.paid_by:
                    balances[(split.user_id, expense.paid_by)] += split.amount

    # Netting balances to avoid duplicate IOUs
    net_balances = defaultdict(float)

    for (debtor, creditor), amount in balances.items():
        reverse = balances.get((creditor, debtor), 0)
        net = amount - reverse
        if net > 0:
            net_balances[(debtor, creditor)] = round(net, 2)

    # Build final result
    result = []
    for (debtor, creditor), amount in net_balances.items():
        from_name = "you" if debtor == user_id else db.query(User).get(debtor).name
        to_name = "you" if creditor == user_id else db.query(User).get(creditor).name

        result.append({
            "from": from_name,
            "to": to_name,
            "amount": amount
        })

    return result

