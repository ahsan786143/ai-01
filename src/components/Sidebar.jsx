function Sidebar({ savedHistory, clearChat, loadSavedChat }) {
  return (
    <div className="hidden md:flex md:w-64 bg-zinc-800 flex-col p-4">
      <h2 className="text-white font-bold text-lg mb-4">Recent History</h2>

      <div className="flex-1 w-full text-left text-sm space-y-2 overflow-y-auto custom-scroll">
        {savedHistory.length === 0 && (
          <p className="text-gray-400 text-center">No recent chats</p>
        )}
        {savedHistory.map((item, index) => (
          <div
            key={index}
            onClick={() => loadSavedChat(item)}
            className="bg-zinc-700 text-white p-2 rounded-lg overflow-hidden cursor-pointer hover:bg-zinc-600 transition"
          >
            <p className="font-semibold truncate" title={item.question}>
              Q: {item.question}
            </p>
            <p className="text-gray-300 truncate" title={item.answer}>
              A: {item.answer}
            </p>
          </div>
        ))}
      </div>

      <button
        onClick={clearChat}
        className="bg-red-600 text-white px-4 py-2 rounded-lg mt-4 w-full"
      >
        Clear Saved History
      </button>
    </div>
  );
}

export default Sidebar;
