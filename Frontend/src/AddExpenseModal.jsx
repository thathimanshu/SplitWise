import React, { useState } from 'react'

function AddExpenseModal({ users, onClose, onSave }) {
  const [description, setDescription] = useState('')
  const [amount, setAmount] = useState(0)
  const [paidBy, setPaidBy] = useState(users[0]?.id || null)
  const [splitType, setSplitType] = useState('equal')
  const [splits, setSplits] = useState(users.map(u => ({ user_id: u.id, percentage: 0 })))

  const handleSave = () => {
    const parsedAmount = parseFloat(amount)
  
    const payload = {
      description,
      amount: parsedAmount,
      paid_by: paidBy,
      split_type: splitType,
      splits:
        splitType === "percentage"
          ? splits.map(s => ({
              user_id: s.user_id,
              percentage: Number(s.percentage)
            }))
          : []
    }
  
    // Check for percentage total
    if (splitType === "percentage") {
      const total = payload.splits.reduce((acc, s) => acc + s.percentage, 0)
      if (total !== 100) {
        alert("Total percentage must be exactly 100%")
        return
      }
    }
  
    console.log("Sending payload:", payload)
    onSave(payload)
  }
  

  const updateSplit = (userId, value) => {
    setSplits(prev =>
      prev.map(s => (s.user_id === userId ? { ...s, percentage: value } : s))
    )
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-6 w-[500px]">
        <div className="text-xl font-semibold mb-2">Add an expense</div>

        <input
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border px-2 py-1 w-full mb-3"
        />

        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="border px-2 py-1 w-full mb-3"
        />

        <label className="font-medium">Paid by:</label>
        <select
          value={paidBy}
          onChange={(e) => setPaidBy(Number(e.target.value))}
          className="border px-2 py-1 mb-3 w-full"
        >
          {users.map(u => (
            <option key={u.id} value={u.id}>{u.name}</option>
          ))}
        </select>

        <label className="font-medium">Split Type:</label>
        <select
          value={splitType}
          onChange={(e) => setSplitType(e.target.value)}
          className="border px-2 py-1 mb-3 w-full"
        >
          <option value="equal">Equal</option>
          <option value="percentage">Percentage</option>
        </select>

        {splitType === 'percentage' && (
          <div>
            {splits.map(s => {
              const user = users.find(u => u.id === s.user_id)
              return (
                <div key={s.user_id} className="flex justify-between mb-1">
                  <span>{user?.name}</span>
                  <input
                    type="number"
                    value={s.percentage}
                    onChange={(e) => updateSplit(s.user_id, Number(e.target.value))}
                    className="w-20 border px-2 py-1"
                  />
                </div>
              )
            })}
          </div>
        )}

        <div className="flex justify-end mt-4 gap-2">
          <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">Cancel</button>
          <button onClick={handleSave} className="px-4 py-2 bg-green-500 text-white rounded">Save</button>
        </div>
      </div>
    </div>
  )
}

export default AddExpenseModal
