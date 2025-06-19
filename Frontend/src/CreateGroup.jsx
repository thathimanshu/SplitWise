import React, { useState } from 'react'
import GroupMemberAdd from './GroupMemberAdd.jsx'
import Button from './Button.jsx'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function CreateGroup() {
  const generateId = () => crypto.randomUUID()
  const [groupName, setGroupName] = useState("")

  const [members, setMembers] = useState([
    { id: generateId(), name: "" },
    { id: generateId(), name: "" },
    { id: generateId(), name: "" },
  ])

  const navigate = useNavigate()

  const handleSave = async () => {
    try {
      const res = await axios.post("http://localhost:8000/groups", {
        name: groupName,
        user_ids: members.map((m) => m.name).filter(Boolean)  // remove empty names
      })

      console.log("Group created:", res.data)
      navigate(`/groups/${res.data.id}`)  // or wherever
    } catch (err) {
      console.error("Error creating group:", err)
    }
  }

  

  const addMember = () => {
    setMembers(prev => [...prev, { id: generateId() }])
  }

  const removeMember = (id) => {
    setMembers(prev => prev.filter(m => m.id !== id))
  }

  return (
    <div className="min-h-screen w-full flex flex-col mt-10 items-start px-6">
      <p className="text-2xl text-gray-400">Start a new Group</p>

      <p className="text-3xl mt-5">My group shall be called...</p>

      <input
        type="text"
        value={groupName}
        onChange={(e) => setGroupName(e.target.value)}
        placeholder="123 Sesame Street"
        className="w-full mt-4 max-w-md text-4xl text-gray-500 px-4 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      <p className="mt-8 text-xl font-semibold text-gray-500">Group members</p>

      <div className="w-full mt-2">
      {members.map((member) => (
      <GroupMemberAdd
        key={member.id}
        value={member.name}
        onChange={(e) => {
          const updated = members.map((m) =>
            m.id === member.id ? { ...m, name: e.target.value } : m
          )
          setMembers(updated)
        }}
        onRemove={() => removeMember(member.id)}
      />
    ))}
      </div>

      <p
        className="mb-3 text-blue-600 hover:underline cursor-pointer mt-4"
        onClick={addMember}
      >
        + Add a person
      </p>
      <button onClick={handleSave}  className={`px-4 py-2 mr-4 rounded-lg font-semibold text-white shadow bg-orange-400 hover:bg-orange-500`}>
        Save
        </button>
    </div>

  )
}

export default CreateGroup
