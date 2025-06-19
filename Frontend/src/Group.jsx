import React from 'react'

function Group({name}) {
  return (
    <div className='flex justify-left items-center mt-1'>
        <img className='h-4 w-4 mr-3' src='/src/assets/label.png'></img>
        <p>{name}</p>
    </div>
  )
}

export default Group