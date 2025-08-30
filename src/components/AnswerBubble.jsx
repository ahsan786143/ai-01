function AnswerBubble({ content }) {
  if (!content) return null;

  // Normalize so it's always an array
  const lines = Array.isArray(content) ? content : [content];

  return (
    <div className="bg-zinc-700 text-white px-4 py-3 rounded-2xl max-w-xs shadow">
      {lines.map((line, i) => (
        <p key={i} className="whitespace-pre-wrap">{line}</p>
      ))}
    </div>
  );
}

export default AnswerBubble;
