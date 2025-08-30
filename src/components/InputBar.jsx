import { motion } from "framer-motion";

function InputBar({ question, setQuestion, askQuestion }) {
  return (
    <div className="flex items-center bg-gray-100 w-full rounded-full border border-gray-300 px-3 py-1 shadow-sm">
      <input
        type="text"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && askQuestion()}
        className="flex-1 h-10 bg-transparent outline-none text-gray-800 text-sm md:text-base px-2"
        placeholder="Type your message..."
      />
      <motion.button
        whileTap={{ scale: 0.9 }}
        whileHover={{ scale: 1.05 }}
        onClick={askQuestion}
        className="ml-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-full text-sm md:text-base shadow transition"
      >
        Send
      </motion.button>
    </div>
  );
}

export default InputBar;
