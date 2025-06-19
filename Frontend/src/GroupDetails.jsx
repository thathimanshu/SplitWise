import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

function GroupDetails() {
  const { group_id } = useParams()
  const [group, setGroup] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
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

    fetchGroup()
  }, [group_id])

  if (loading) return <p className="p-6">Loading...</p>
  if (!group) return <p className="p-6 text-red-600">Group not found</p>

  return (
    <div>
      assa
    </div>
  )
}

export default GroupDetails
