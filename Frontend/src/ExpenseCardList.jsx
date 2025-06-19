import React, { useEffect, useState } from 'react'
import ExpenseCard from './ExpenseCard'
import axios from 'axios'

function ExpenseCardList({id,users}) {
  const [expenses, setExpenses] = useState([])

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/groups/${id}/expenses`)
        setExpenses(res.data)
      } catch (err) {
        console.error("Failed to fetch expenses:", err)
      }
    }

    fetchExpenses()
  }, [id])

  return (
    <div>
      {expenses.map((expense, index) => (
        <ExpenseCard
        key={expense.id}
        users={users}
        date={new Date().getDate()} // temporary, or use real date later
        title={expense.description}
        paidBy={expense.paid_by}
        paidAmount={expense.amount}
        lentAmount={
          (() => {
            const you = users.find(u => u.name.toLowerCase() === 'you')
            const yourSplit = expense.splits.find(s => s.user_id === you?.id)
            if (!yourSplit || expense.paid_by === you?.id) {
              return expense.splits
                .filter(s => s.user_id !== you?.id)
                .reduce((sum, s) => sum + s.amount, 0)
            }
            
            return yourSplit.amount
          })()
        }
      />
      
      ))}
    </div>
  )
}

export default ExpenseCardList
