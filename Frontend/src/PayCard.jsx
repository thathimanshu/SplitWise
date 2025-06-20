import React from 'react'

function PayCard({ color, from, to, amount }) {
  const name = color === 'green' ? from : to
  const verb = color === 'green' ? 'owes you' : 'you owe'

  return (
    <div className='flex items-center space-x-4 mb-4'>
      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gray-400 to-gray-700 flex items-center justify-center text-white">
        ₹
      </div>

      <div className="flex flex-col">
        <span className="text-md font-semibold text-gray-800">{name}</span>
        <span className={`text-sm font-medium ${color === 'green' ? 'text-green-500' : 'text-red-500'}`}>
          {verb} ₹{amount.toFixed(2)}
        </span>
      </div>
    </div>
  )
}

export default PayCard
