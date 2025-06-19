function GroupMemberAdd({ value, onChange, onRemove }) {
  return (
    <div className="flex items-center mb-2">
      <img className="w-8 h-8 rounded-full" src="/src/assets/dp.png" alt="dp" />

      <input
        type="text"
        placeholder="Name"
        value={value}
        onChange={onChange}
        className="w-80 m-2 text-xl text-gray-700 px-4 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      <button
        onClick={onRemove}
        className="text-red-500 text-xl ml-2 hover:text-red-700"
      >
        ❌
      </button>
    </div>
  )
}
export default GroupMemberAdd