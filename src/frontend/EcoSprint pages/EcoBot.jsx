import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Leaf, LayoutDashboard, Bot, Trophy, BookOpen, Calendar, 
  Settings, Trash2, Send, User
} from 'lucide-react';
import SidebarEcoDboard from '../../components/Sidebar/SidebarEcoDboard';
import styles from './EcoBot.module.css';

// Sample messages
const initialMessages = [
  {
    id: 1,
    type: 'bot',
    content: "Hello! I'm your EcoBot assistant. I can help you understand environmental concepts, climate change, and sustainability practices specifically in the context of India. How can I assist you today?",
    time: "10:00 AM"
  },
  {
    id: 2,
    type: 'user',
    content: "Can you explain the greenhouse effect and how it's impacting India's climate recently?",
    time: "10:01 AM"
  },
  {
    id: 3,
    type: 'bot',
    content: `The **greenhouse effect** is a natural process where certain gases (CO2, Methane, etc.) trap heat in Earth's atmosphere. Without it, Earth would be too cold for life, but humans are now enhancing this effect.

**Impact on India:**

• **Heatwaves:** India is seeing more frequent and intense heatwaves, especially in North and Central regions.

• **Monsoon Shifts:** Rainfall is becoming more erratic—we get very heavy rain in short bursts causing floods, followed by long dry spells.

• **Glacial Melt:** In the Himalayas, glaciers are retreating rapidly, which threatens the water supply of major rivers like the Ganges and Brahmaputra.`,
    time: "10:01 AM"
  }
];

// Suggestion chips
const suggestions = [
  { text: "What is climate change?", icon: "leaf", color: "text-emerald-500" },
  { text: "How does solar energy work?", icon: "zap", color: "text-yellow-500" },
  { text: "Why is water conservation important?", icon: "droplets", color: "text-blue-500" }
];

// Icons mapping for suggestions
const iconComponents = {
  leaf: Leaf,
  zap: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
    </svg>
  ),
  droplets: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2.69l5.74 5.88a8.44 8.44 0 0 1 2.15 7.42A8.49 8.49 0 0 1 12 22a8.49 8.49 0 0 1-7.89-5.01 8.44 8.44 0 0 1 2.15-7.42L12 2.69Z"></path>
    </svg>
  )
};

const EcoBot = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState(initialMessages);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const textareaRef = useRef(null);
  const chatContainerRef = useRef(null);

  // Auto-scroll to bottom
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
    }
  }, [inputValue]);

  const handleSend = () => {
    if (!inputValue.trim()) return;

    // Add user message
    const userMessage = {
      id: messages.length + 1,
      type: 'user',
      content: inputValue,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate bot response after delay
    setTimeout(() => {
      const botResponse = {
        id: messages.length + 2,
        type: 'bot',
        content: "That's a great question about the environment! Based on current research and data specific to India, I can provide you with detailed information about sustainability practices, renewable energy adoption, and climate action initiatives. Would you like me to elaborate on any specific aspect?",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 2000);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleClear = () => {
    setMessages([initialMessages[0]]);
    setIsTyping(false);
  };

  const handleSuggestionClick = (text) => {
    setInputValue(text);
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  };

  return (
    <div className="h-screen bg-[#F8FAFC] font-sans text-slate-900 overflow-hidden">
      <SidebarEcoDboard />
      
      {/* Main Chat Layout */}
      <main className="flex-1 flex flex-col relative h-full ml-20 bg-[#F8FAFC]">
        {/* Header */}
        <header className="h-20 bg-white border-b border-slate-200 px-8 flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#4EA24E] to-emerald-400 flex items-center justify-center text-white shadow-sm">
                <Bot className="w-7 h-7" />
              </div>
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
            </div>
            <div>
              <h1 className="font-bold text-slate-800 text-lg">EcoBot</h1>
              <p className="text-xs text-slate-500 flex items-center gap-1">
                <span className="text-green-500 font-semibold uppercase tracking-wider">Online</span>
                <span>· Powered by Google Gemini</span>
              </p>
            </div>
          </div>
          <button 
            onClick={handleClear}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-lg transition-colors border border-slate-200"
          >
            <Trash2 className="w-4 h-4" />
            Clear
          </button>
        </header>

        {/* Conversation Area */}
        <div 
          ref={chatContainerRef}
          className="flex-1 overflow-y-auto custom-scrollbar px-6 py-8 space-y-8"
        >
          {messages.map((message) => (
            <div 
              key={message.id}
              className={`flex items-start gap-4 max-w-3xl ${message.type === 'user' ? 'ml-auto flex-row-reverse' : ''}`}
            >
              <div className={`w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center ${
                message.type === 'user' 
                  ? 'bg-[#4EA24E] shadow-md shadow-[#4EA24E]/20' 
                  : 'bg-slate-200'
              }`}>
                {message.type === 'user' ? (
                  <User className="w-6 h-6 text-white" />
                ) : (
                  <Bot className="w-6 h-6 text-slate-500" />
                )}
              </div>
              <div className={`space-y-2 ${message.type === 'user' ? 'flex flex-col items-end' : ''}`}>
                <div className={`p-5 rounded-2xl shadow-sm text-slate-700 leading-relaxed whitespace-pre-line ${
                  message.type === 'user'
                    ? 'bg-[#4EA24E] text-white rounded-tr-none'
                    : 'bg-white border border-slate-200 rounded-tl-none'
                }`}>
                  {message.content}
                </div>
                <span className={`text-[10px] text-slate-400 font-medium ${message.type === 'user' ? 'mr-1' : 'ml-1'}`}>
                  {message.time}
                </span>
              </div>
            </div>
          ))}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex items-start gap-4 max-w-3xl">
              <div className="w-10 h-10 rounded-full bg-slate-200 flex-shrink-0 flex items-center justify-center">
                <Bot className="w-6 h-6 text-slate-500" />
              </div>
              <div className="bg-slate-200/50 px-4 py-3 rounded-2xl rounded-tl-none flex gap-1 items-center h-10">
                <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '200ms' }}></div>
                <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '400ms' }}></div>
              </div>
            </div>
          )}
        </div>

        {/* Input Area */}
        <footer className="bg-white border-t border-slate-200 p-6">
          {/* Suggestions */}
          <div className="max-w-4xl mx-auto mb-6 flex flex-wrap gap-3 justify-center">
            {suggestions.map((suggestion, index) => {
              const IconComponent = iconComponents[suggestion.icon];
              return (
                <button
                  key={index}
                  onClick={() => handleSuggestionClick(suggestion.text)}
                  className="group flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-full hover:border-[#4EA24E] hover:text-[#4EA24E] transition-all text-sm font-medium text-slate-600"
                >
                  <IconComponent className={`w-4 h-4 ${suggestion.color} group-hover:text-[#4EA24E]`} />
                  {suggestion.text}
                </button>
              );
            })}
          </div>

          {/* Chat Input Bar */}
          <div className="max-w-4xl mx-auto relative group">
            <div className="flex items-end gap-3 bg-slate-50 border border-slate-200 rounded-[24px] p-2 focus-within:border-[#4EA24E] focus-within:ring-2 focus-within:ring-[#4EA24E]/10 transition-all shadow-sm">
              <textarea
                ref={textareaRef}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask EcoBot about the environment..."
                rows={1}
                className="flex-1 bg-transparent border-none focus:ring-0 text-slate-700 py-3 px-4 resize-none max-h-48 custom-scrollbar placeholder:text-slate-400 outline-none"
              />
              <button
                onClick={handleSend}
                disabled={!inputValue.trim()}
                className={`w-12 h-12 flex items-center justify-center rounded-full transition-all mb-0.5 disabled:cursor-not-allowed ${
                  inputValue.trim() 
                    ? 'bg-[#4EA24E] shadow-lg shadow-[#4EA24E]/30' 
                    : 'bg-slate-200'
                }`}
              >
                <Send className="w-5 h-5 text-white" />
              </button>
            </div>
            <p className="text-center text-[10px] text-slate-400 mt-3 font-medium uppercase tracking-widest">
              Experimental AI · Verify critical information
            </p>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default EcoBot;
