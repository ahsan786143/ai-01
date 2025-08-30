import AnswerBubble from './AnswerBubble';

function ChatWindow({ chatHistory, loading, messagesEndRef, answerRef }) {
  return (
    <div className="space-y-4">
      {chatHistory.map((item, index) => (
        <div key={index} className="space-y-2">
          {item.question && (
            <div className="flex justify-end">
              <div className="bg-zinc-600 text-white px-3 md:px-4 py-2 md:py-3 rounded-2xl max-w-[75%] text-right shadow text-sm md:text-base">
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
          <div className="bg-gray-700 text-white px-3 md:px-4 py-2 md:py-3 rounded-2xl max-w-[75%] font-mono animate-pulse text-sm md:text-base">
            Typing...
          </div>
        </div>
      )}

      <div ref={messagesEndRef} />
    </div>
  );
}

export default ChatWindow;
