import React from 'react'
import PayCard from './PayCard.jsx'
function Balance({color}) {
  return (
    <>
    <div className='w-full min-h-screen'>
      <div className={`p-3 text-gray-400 text-2xl ${color === "green" ? "text-left ml-2" : "text-right mr-2"}`}>
        {color === "red" ? "You owe" : "You are owed"}
        <hr></hr>
      </div>

      <div>
        <PayCard color={color} />
      </div>
    </div>
    </>
  )
}

export default Balance