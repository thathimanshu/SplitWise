import React from 'react'
import Button from './Button.jsx'
import Balance from './Balance.jsx'

const DashBoard = () => {
  return (
    <div className='shadow-2xl'>
    <div className='bg-gray-200 rounded-lg flex w-2xl justify-between align-items-center px-4 py-6'>
        <div className="text-3xl font-semibold">DashBoard</div>
        <div className='w-xl flex justify-end'>
            <Button title="Add an expense" color="red"/>
            <Button title="Settle Up" color="green"/>
        </div>
    </div>
    <hr className='border-gray-600'></hr>
    <div className='bg-gray-200 rounded-lg flex w-2xl justify-between align-items-center px-4 py-6'>
        <div className='px-6 w-full border-r border-gray-600'>
            <div className="text-gray-600">Total Balance</div> 
            <div className='text-green-500'>x dollars</div>
        </div>
        <div className='px-6 w-full'>
            <div className="text-gray-600">You owe</div> 
            <div>x dollars</div>
        </div>
        <div className='px-6 w-full border-l border-gray-600'> 
            <div className="text-gray-600">you are owed</div> 
            <div className='text-green-500'>x dollars</div>
        </div>

    </div>
    <div className='flex justify-around'>
        <Balance color="green" />
        <Balance color="red" />
    </div>
    </div>
  )
}

export default DashBoard