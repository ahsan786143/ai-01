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
    // restore just one saved Q/A
    setChatHistory([{ question: item.question, answer: item.answer }]);
    setTimeout(() => {
      answerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  return (
    <div className="grid grid-cols-5 h-screen text-center">
      <Sidebar savedHistory={savedHistory} clearChat={clearChat} loadSavedChat={loadSavedChat} />
      <div className="col-span-4 flex flex-col bg-zinc-900 p-6">
        <h2 className="text-white font-bold text-xl mb-4 text-center">💬 Chat Window</h2>
        <ChatWindow
          chatHistory={chatHistory}
          loading={loading}
          chatContainerRef={chatContainerRef}
          messagesEndRef={messagesEndRef}
          answerRef={answerRef}
        />
        <InputBar
          question={question}
          setQuestion={setQuestion}
          askQuestion={askQuestion}
        />
      </div>
    </div>
  );
}

export default App;
