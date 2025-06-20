import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'

function GroupBalanceCol() {
  const [balances, setBalances] = useState([])
  const { group_id } = useParams()

  useEffect(() => {
    const fetchBalances = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/groups/${group_id}/balances`)
        setBalances(res.data)
      } catch (err) {
        console.error("Failed to fetch balances:", err)
      }
    }

    fetchBalances()
  }, [group_id])

  // Calculate net balances
  const netMap = {}

  balances.forEach(({ from, to, amount }) => {
    if (!netMap[from]) netMap[from] = 0
    if (!netMap[to]) netMap[to] = 0

    netMap[from] -= amount
    netMap[to] += amount
  })

  const summary = Object.entries(netMap)
    .map(([name, net]) => {
      if (net === 0) return null
      return {
        name,
        type: net > 0 ? 'gets' : 'owes',
        amount: Math.abs(net).toFixed(2)
      }
    })
    .filter(Boolean)

  return (
    <div className="mt-6 px-4">
      <h2 className="text-gray-500 font-semibold mb-4">GROUP BALANCES</h2>
      {summary.length === 0 ? (
        <p className="text-sm text-gray-400">All settled up 🎉</p>
      ) : (
        summary.map((item, idx) => (
          <div key={idx} className="mb-3 flex items-center">
            <img className='w-8 h-8 mr-2 rounded-full'  src="/src/assets/dp.png"></img>
            
           <div className=' flex flex-col items-start'>
           <div className="font-semibold text-gray-800">{item.name}</div>{' '}
            <div className={item.type === 'gets' ? 'text-green-500' : 'text-red-500'}>
              {item.type === 'gets' ? 'gets back' : 'owes'} ₹{item.amount}
            </div>
             </div>
          </div>
        ))
      )}
    </div>
  )
}

export default GroupBalanceCol
