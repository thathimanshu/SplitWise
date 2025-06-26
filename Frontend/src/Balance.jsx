import React from 'react'
import PayCard from './PayCard.jsx'

function Balance({ color, transactions, type }) {
  // Determine if the transaction is relevant based on 'you'
  const filteredTxns = transactions.filter((txn) =>
    type === "owe"
      ? txn.from.toLowerCase() === "you"
      : txn.to.toLowerCase() === "you"
  )

  return (
    <div className='w-full min-h-screen'>
      <div className={`p-3 text-gray-400 text-2xl ${color === "green" ? "text-left ml-2" : "text-right mr-2"}`}>
        {type === "owe" ? "You owe" : "You are owed"}
        <hr />
      </div>

      <div>
        {filteredTxns.length > 0 ? (
          filteredTxns.map((txn, idx) => (
            <PayCard
              key={idx}
              color={color}
              from={txn.from}
              to={txn.to}
              amount={txn.amount}
            />
          ))
        ) : (
          <div className='text-center text-gray-400 mt-4'>No transactions</div>
        )}
      </div>
    </div>
  )
}

export default Balance
