import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Button from './Button.jsx'
import Balance from './Balance.jsx'

const DashBoard = () => {
  const [allTxns, setAllTxns] = useState([])

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const res = await axios.get("http://localhost:8000/balances/users/1") // Replace 1 dynamically if needed
        setAllTxns(res.data)
      } catch (err) {
        console.error("Failed to load dashboard summary", err)
      }
    }

    fetchSummary()
  }, [])

  const youOwe = allTxns
    .filter(txn => (txn.from || "").toLowerCase() === "you")
    .reduce((acc, txn) => acc + txn.amount, 0)

  const youAreOwed = allTxns
    .filter(txn => (txn.to || "").toLowerCase() === "you")
    .reduce((acc, txn) => acc + txn.amount, 0)

  const net = youAreOwed - youOwe

  return (
    <div className='shadow-2xl'>
      <div className='bg-gray-200 rounded-lg flex w-2xl justify-between align-items-center px-4 py-6'>
        <div className="text-3xl font-semibold">DashBoard</div>
        <div className='w-xl flex justify-end'>
          <Button title="Add an expense" color="red" />
          <Button title="Settle Up" color="green" />
        </div>
      </div>

      <hr className='border-gray-600' />

      <div className='bg-gray-200 rounded-lg flex w-2xl justify-between align-items-center px-4 py-6'>
        <div className='px-6 w-full border-r border-gray-600'>
          <div className="text-gray-600">Total Balance</div>
          <div className={net >= 0 ? 'text-green-500' : 'text-red-500'}>
            ₹{net.toFixed(2)}
          </div>
        </div>

        <div className='px-6 w-full'>
          <div className="text-gray-600">You owe</div>
          <div className='text-red-500'>₹{youOwe.toFixed(2)}</div>
        </div>

        <div className='px-6 w-full border-l border-gray-600'>
          <div className="text-gray-600">You are owed</div>
          <div className='text-green-500'>₹{youAreOwed.toFixed(2)}</div>
        </div>
      </div>

      <div className='flex justify-around'>
        <Balance color="green" transactions={allTxns} type="owed" />
        <Balance color="red" transactions={allTxns} type="owe" />
      </div>
    </div>
  )
}

export default DashBoard
