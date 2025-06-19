import React from 'react'

function ExpenseCard({users, date, title, paidBy, paidAmount=0, lentAmount=0 }) {
  const payerName = users.find(u => u.id === paidBy)?.name || "Unknown"
  return (
    <div className="flex w-170 items-start justify-between p-4 border-b">
      <div className="text-center flex text-sm text-gray-500 mr-4">
       <div>
        <div className="font-bold">JUN</div>
        <div className="text-xl">{date}</div>
       </div>
        <div className="flex ml-2 items-center mr-3">
          <img src="/src/assets/bill.png" className="w-12 h-12 mr-2" alt="receipt" />
        </div>
        <p className="text-lg self-end font-medium">{title}</p>
      </div>

      <div className="flex flex-col mr-4 ">
        <p className="text-m">
          <span className="text-gray-500">{payerName} paid </span>
          <span className="font-semibold">${paidAmount.toFixed(2)}</span>
        </p>
        <p className="text-m">
          <span className="text-gray-500">{payerName === 'you' ? 'You lent' : `${payerName} lent you `}</span>
          <span className={`${payerName === 'you' ? 'text-green-500' : 'text-red-500'} font-semibold`}>
            ${lentAmount.toFixed(2)}
          </span>

        </p>
      </div>
    </div>
  )
}

export default ExpenseCard
