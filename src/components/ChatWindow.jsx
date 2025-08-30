import AnswerBubble from './AnswerBubble';

function ChatWindow({ chatHistory, loading, chatContainerRef, messagesEndRef, answerRef }) {
  return (
    <div
      ref={chatContainerRef}
      className="flex-1 overflow-y-auto p-4 rounded-xl mb-4 text-left space-y-4 custom-scroll bg-zinc-900"
    >
      {chatHistory.map((item, index) => (
        <div key={index} className="space-y-2">
          {item.question && (
            <div className="flex justify-end">
              <div className="bg-zinc-600 text-white px-4 py-3 rounded-2xl max-w-xs text-right shadow">
                {item.question}
              </div>
            </div>
          )}

          {item.answer && (
            <div className="flex justify-start" ref={answerRef}>
              <AnswerBubble content={item.answer} />
            </div>
          )}
        </div>
      ))}

      {loading && (
        <div className="flex justify-start">
          <div className="bg-gray-700 text-white px-4 py-3 rounded-2xl max-w-xs font-mono animate-pulse">
            Typing...
          </div>
        </div>
      )}

      <div ref={messagesEndRef} />
    </div>
  );
}

export default ChatWindow;
