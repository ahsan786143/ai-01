import { motion } from "framer-motion";
import AnswerBubble from './AnswerBubble';

function ChatWindow({ chatHistory, loading, messagesEndRef, answerRef }) {
  return (
    <div className="space-y-4">
      {chatHistory.map((item, index) => (
        <div key={index} className="space-y-2">
          {item.question && (
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="flex justify-end"
            >
              <div className="bg-blue-500 text-white px-4 py-2 rounded-2xl max-w-[85%] md:max-w-[70%] text-sm md:text-base shadow">
                {item.question}
              </div>
            </motion.div>
          )}

          {item.answer && (
            <motion.div
              ref={answerRef}
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="flex justify-start"
            >
              <AnswerBubble content={item.answer} />
            </motion.div>
          )}
        </div>
      ))}

      {loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ repeat: Infinity, duration: 1, repeatType: "mirror" }}
          className="flex justify-start"
        >
          <div className="bg-gray-200 text-gray-700 px-4 py-2 rounded-2xl max-w-[70%] font-mono text-sm md:text-base">
            Typing...
          </div>
        </motion.div>
      )}

      <div ref={messagesEndRef} />
    </div>
  );
}

export default ChatWindow;
