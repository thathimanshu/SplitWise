import React, { useState } from 'react'
import Button from './Button.jsx'
import AddExpenseModal from './AddExpenseModal'
import axios from 'axios'

function GroupHeader({ name, users, groupId, onExpenseAdded }) {
  const [showModal, setShowModal] = useState(false)

  const handleSave = async (expenseData) => {
    try {
      const res = await axios.post(`http://localhost:8000/groups/${groupId}/expenses`, expenseData)
      console.log("Expense added:", res.data)
      setShowModal(false)
      if (onExpenseAdded) onExpenseAdded() // Notify parent to refetch
      window.location.reload()  
    } catch (err) {
      console.error("Error saving expense:", err)
    }
  }

  return (
    <>
      <div className="flex justify-between items-center bg-gray-100 p-4 rounded">
        <div className="flex items-center">
          <img src="/src/assets/dp.png" className="w-10 h-10 rounded-full mr-3" />
          <div>
            <p className="text-2xl font-semibold">{name}</p>
            <p className="text-gray-500 text-sm">{users.length} people</p>
          </div>
        </div>
        <div className="flex gap-3">
          <button
            className="px-4 py-2 mr-4 rounded-lg font-semibold text-white shadow bg-red-400 hover:bg-red-500"
            onClick={() => setShowModal(true)}
          >
            Add an expense
          </button>
          <Button color="green" title="Settle up" />
        </div>
      </div>

      {showModal && (
        <AddExpenseModal
          users={users}
          onClose={() => setShowModal(false)}
          onSave={handleSave}
        />
      )}
    </>
  )
}

export default GroupHeader
