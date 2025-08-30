function InputBar({ question, setQuestion, askQuestion }) {
  return (
    <div className="bg-zinc-800 w-full text-white p-1 pr-2 rounded-3xl border border-zinc-700 flex h-12 md:h-14">
      <input
        type="text"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && askQuestion()}
        className="flex-1 h-full px-3 bg-transparent outline-none text-white text-sm md:text-base"
        placeholder="Ask me anything..."
      />
      <button
        onClick={askQuestion}
        className="px-3 md:px-4 bg-zinc-700 rounded-2xl ml-2 text-sm md:text-base"
      >
        Ask
      </button>
    </div>
  );
}

export default InputBar;
