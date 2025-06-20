import React from 'react'

function BalanceCard({ from, to, amount }) {
  const isYou = from.toLowerCase() === "you"
  const text = isYou
    ? `get back $${amount.toFixed(2)}`
    : `owes $${amount.toFixed(2)}`

  return (
    <div className="flex items-center space-x-4 mb-4">
      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gray-400 to-gray-700 flex items-center justify-center">
      </div>

      <div className="flex flex-col">
        <span className="text-md font-semibold text-gray-800">{from}</span>
        <span
          className={`text-sm font-medium ${
            isYou ? 'text-green-500' : 'text-red-500'
          }`}
        >
          {text}
        </span>
      </div>
    </div>
  )
}

export default BalanceCard
