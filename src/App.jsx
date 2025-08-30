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
  const messagesEndRef = useRef(null);
  const answerRef = useRef(null);

  const [savedHistory, setSavedHistory] = useState(() => {
    try {
      const saved = localStorage.getItem('chatHistory');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [chatHistory, setChatHistory] = useState([]);

  useEffect(() => {
    localStorage.setItem('chatHistory', JSON.stringify(savedHistory));
  }, [savedHistory]);

  useLayoutEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory, loading]);

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
          old.some((i) => i.question === newItem.question && i.answer === newItem.answer)
            ? old
            : [...old, newItem]
        );
        return updated;
      });
    } catch {
      setChatHistory((prev) => {
        const updated = [...prev];
        updated[updated.length - 1].answer = '⚠️ Network error';
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
    <div className="flex h-screen w-full overflow-hidden bg-gray-50">
      {/* Sidebar hidden on mobile */}
      <Sidebar savedHistory={savedHistory} clearChat={clearChat} loadSavedChat={loadSavedChat} />

      {/* Main Chat Area */}
      <div className="flex flex-col flex-1 relative">
        {/* Header */}
        <header className="bg-white text-gray-800 font-bold text-lg p-4 border-b border-gray-200 shadow-sm text-center md:text-left">
          💬 Smart Chat
        </header>

        {/* Chat Area */}
        <main className="flex-1 overflow-y-auto px-3 py-2 md:px-4 md:py-4 custom-scroll">
          <ChatWindow
            chatHistory={chatHistory}
            loading={loading}
            messagesEndRef={messagesEndRef}
            answerRef={answerRef}
          />
        </main>

        {/* Input Bar */}
        <footer className="p-2 md:p-4 border-t border-gray-200 bg-white sticky bottom-0">
          <InputBar question={question} setQuestion={setQuestion} askQuestion={askQuestion} />
        </footer>
      </div>
    </div>
  );
}

export default App;
