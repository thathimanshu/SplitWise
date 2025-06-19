import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import GroupHeader from './GroupHeader'
import ExpenseCardList from './ExpenseCardList'

function GroupDetails() {
  const { group_id } = useParams()
  const [group, setGroup] = useState(null)
  const [loading, setLoading] = useState(true)

  const fetchGroup = async () => {
    try {
      const res = await axios.get(`http://localhost:8000/groups/${group_id}`)
      setGroup(res.data)
    } catch (err) {
      console.error("Failed to fetch group:", err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchGroup()
  }, [group_id])

  if (loading) return <p className="p-6">Loading...</p>
  if (!group) return <p className="p-6 text-red-600">Group not found</p>

  return (
    <div className="px-6 py-4 border w-175">
      <GroupHeader
        name={group.name}
        users={group.users}
        groupId={group.id}
        onExpenseAdded={fetchGroup} 
      />
      <ExpenseCardList id={group.id} users={group.users} />
    </div>
  )
}
export default GroupDetails
