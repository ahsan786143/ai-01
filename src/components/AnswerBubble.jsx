function AnswerBubble({ content }) {
  if (!content) return null;

  const lines = Array.isArray(content) ? content : [content];

  return (
    <div className="bg-zinc-700 text-white px-3 md:px-4 py-2 md:py-3 rounded-2xl max-w-[75%] shadow text-sm md:text-base">
      {lines.map((line, i) => (
        <p key={i} className="whitespace-pre-wrap">{line}</p>
      ))}
    </div>
  );
}

export default AnswerBubble;
