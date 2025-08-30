function InputBar({ question, setQuestion, askQuestion }) {
  return (
    <div className="bg-zinc-800 w-full max-w-2xl text-white p-1 pr-5 rounded-3xl border border-zinc-700 flex h-16 mx-auto">
      <input
        type="text"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && askQuestion()}
        className="w-full h-full p-3 outline-none bg-transparent text-white"
        placeholder="Ask me anything"
      />
      <button
        onClick={askQuestion}
        className="px-4 bg-zinc-700 rounded-2xl ml-2"
      >
        Ask
      </button>
    </div>
  );
}

export default InputBar;
