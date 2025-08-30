import './App.css';
import { useState, useRef, useEffect, useLayoutEffect } from 'react';
import { URL } from './constants';
import './styles/customScroll.css';

import Sidebar from './components/Sidebar.jsx';
import ChatWindow from './components/ChatWindow.jsx';
import InputBar from './components/InputBar.jsx';

function App() {
  const [question, setQuestion] = useState('');
  const [loading, setLoading] = useState(false);
  const chatContainerRef = useRef(null);
  const messagesEndRef = useRef(null);
  const answerRef = useRef(null);

  // Saved history (localStorage)
  const [savedHistory, setSavedHistory] = useState(() => {
    try {
      const saved = localStorage.getItem('chatHistory');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Current session
  const [chatHistory, setChatHistory] = useState([]);

  // Save permanent history
  useEffect(() => {
    localStorage.setItem('chatHistory', JSON.stringify(savedHistory));
  }, [savedHistory]);

  // Auto scroll
  useLayoutEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory, loading]);

  // Ask question handler
  const askQuestion = async () => {
    if (!question.trim()) return;

    const currentQuestion = question;
    setQuestion('');
    setLoading(true);

    setChatHistory((prev) => [...prev, { question: currentQuestion, answer: null }]);

    try {
      const response = await fetch(URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contents: [{ parts: [{ text: currentQuestion }] }] }),
      });
      const data = await response.json();
      const dataString = data?.candidates?.[0]?.content?.parts?.[0]?.text || 'No answer';

      setChatHistory((prev) => {
        const updated = [...prev];
        const newItem = { ...updated[updated.length - 1], answer: dataString };
        updated[updated.length - 1] = newItem;

        setSavedHistory((old) =>
          old.some((item) => item.question === newItem.question && item.answer === newItem.answer)
            ? old
            : [...old, newItem]
        );
        return updated;
      });
    } catch {
      setChatHistory((prev) => {
        const updated = [...prev];
        const newItem = { ...updated[updated.length - 1], answer: 'Network error' };
        updated[updated.length - 1] = newItem;

        setSavedHistory((old) =>
          old.some((item) => item.question === newItem.question && item.answer === newItem.answer)
            ? old
            : [...old, newItem]
        );
        return updated;
      });
    } finally {
      setLoading(false);
    }
  };

  const clearChat = () => {
    setSavedHistory([]);
    localStorage.removeItem('chatHistory');
    setChatHistory([]);
  };

  const loadSavedChat = (item) => {
    setChatHistory([{ question: item.question, answer: item.answer }]);
    setTimeout(() => {
      answerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  return (
    <div className="flex h-screen w-full overflow-hidden bg-zinc-900">
      {/* Sidebar hidden on mobile */}
      <Sidebar
        savedHistory={savedHistory}
        clearChat={clearChat}
        loadSavedChat={loadSavedChat}
      />

      {/* Main Chat Area */}
      <div className="flex flex-col flex-1 relative">
        <h2 className="text-white font-bold text-lg md:text-xl p-4 border-b border-zinc-700 text-center md:text-left">
          💬 Welcome Ask Anything 
        </h2>

        {/* Scrollable Chat Window */}
        <div className="flex-1 overflow-y-auto p-3 md:p-4 custom-scroll">
          <ChatWindow
            chatHistory={chatHistory}
            loading={loading}
            chatContainerRef={chatContainerRef}
            messagesEndRef={messagesEndRef}
            answerRef={answerRef}
          />
        </div>

        {/* Sticky Input at bottom */}
        <div className="p-2 md:p-4 border-t border-zinc-700 bg-zinc-900">
          <InputBar
            question={question}
            setQuestion={setQuestion}
            askQuestion={askQuestion}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
