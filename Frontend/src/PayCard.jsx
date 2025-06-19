import React from 'react'

function PayCard({color}) {
  return (
    <div className='flex'>
        <img className='w-10 h-auto rounded-full m-2' src='src/assets/dp.png'></img>
        <div>
            <p className='text-left'>Name</p>
            <p>you owe : amount</p>
        </div>
    </div>
  )
}

export default PayCard