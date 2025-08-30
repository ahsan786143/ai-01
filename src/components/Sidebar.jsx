function Sidebar({ savedHistory, clearChat, loadSavedChat }) {
  return (
    <aside className="hidden md:flex md:w-72 bg-white flex-col p-4 border-r border-gray-200 shadow-sm">
      <h2 className="text-gray-800 font-bold text-lg mb-4">📜 History</h2>

      <div className="flex-1 space-y-2 overflow-y-auto custom-scroll">
        {savedHistory.length === 0 && (
          <p className="text-gray-400 text-center">No recent chats</p>
        )}
        {savedHistory.map((item, index) => (
          <div
            key={index}
            onClick={() => loadSavedChat(item)}
            className="bg-gray-100 text-gray-700 p-2 rounded-lg cursor-pointer hover:bg-blue-100 transition"
          >
            <p className="font-semibold truncate" title={item.question}>
              Q: {item.question}
            </p>
            <p className="text-gray-500 truncate" title={item.answer}>
              A: {item.answer}
            </p>
          </div>
        ))}
      </div>

      <button
        onClick={clearChat}
        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg mt-4 w-full transition"
      >
        Clear History
      </button>
    </aside>
  );
}

export default Sidebar;
