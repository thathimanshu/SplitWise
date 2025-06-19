import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Group from './Group.jsx'
function Left() {
  const [groups, setGroups] = useState([])

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const res = await axios.get('http://localhost:8000/groups')
        setGroups(res.data)
        console.log(res)
      } catch (err) {
        console.error('Failed to fetch groups:', err)
      }
    }

    fetchGroups()
  }, [])

  return (
    <div className='w-70'>
        <div className='flex h-10 items-center font-semibold text-xl text-green-500'><img className='w-4 mr-2' src="src/assets/email.png"></img>DashBoard</div>
        <div className='flex h-10 items-center font-semibold text-xl text-red-500'><img className='w-4 mr-2' src="src/assets/finish.png"></img>Recent Activity</div>

        <div className='flex justify-between mr-5 px-2 bg-gray-300'>
            <div>GROUPS</div>
            <a href='/groups/new'>add</a>
        </div>
        {groups.map((group) => (
          <a key={group.id} href={`/groups/${group.id}`} className="hover:underline">
            <Group name={group.name} />
          </a>
        ))}
    </div>
  )
}

export default Left