
import React, { useState } from 'react';
import { Sparkles, X, MessageSquare, Send } from 'lucide-react';
import { getTravelAdvice } from '../services/geminiService';

const SmartAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<{ role: 'user' | 'ai'; text: string }[]>([
    { role: 'ai', text: 'Welcome to Aura Airlines. How can I assist your travel plans today?' }
  ]);
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setLoading(true);
    
    const response = await getTravelAdvice(userMsg);
    setMessages(prev => [...prev, { role: 'ai', text: response || 'I am sorry, I am having trouble connecting.' }]);
    setLoading(false);
  };

  return (
    <div className="fixed bottom-3 right-3 sm:bottom-6 sm:right-6 z-[150]">
      {isOpen ? (
        <div className="w-[calc(100vw-1.5rem)] sm:w-96 glass-dark rounded-[1.5rem] sm:rounded-[2rem] overflow-hidden shadow-2xl flex flex-col aura-glow animate-in slide-in-from-bottom-2 border border-white/10 max-h-[80vh]">
          <div className="p-4 sm:p-5 bg-gradient-to-r from-indigo-600 to-purple-600 flex justify-between items-center text-white">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 sm:w-5 h-5" />
              <span className="font-bold tracking-tight text-sm sm:text-base">Aura Concierge</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:bg-white/20 p-1.5 rounded-lg transition-colors">
              <X className="w-4 h-4 sm:w-5 h-5" />
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 bg-slate-900/50 scrollbar-thin scrollbar-thumb-white/10 min-h-[300px]">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-3 sm:p-4 rounded-[1.25rem] sm:rounded-[1.5rem] text-[13px] sm:text-sm leading-relaxed ${
                  m.role === 'user' ? 'bg-indigo-600 text-white rounded-br-none' : 'glass text-white rounded-bl-none'
                }`}>
                  {m.text}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="glass p-3 rounded-[1.25rem] text-white text-[10px] animate-pulse font-black uppercase tracking-widest">
                  Aura is Thinking...
                </div>
              </div>
            )}
          </div>

          <div className="p-4 sm:p-5 border-t border-white/10 flex gap-2 sm:gap-3 bg-slate-900/80">
            <input 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Type a message..."
              className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white text-[13px] sm:text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-all"
            />
            <button 
              onClick={handleSend}
              className="bg-indigo-600 text-white p-2.5 rounded-xl hover:bg-indigo-700 transition-all shadow-lg active:scale-95 shrink-0"
            >
              <Send className="w-4 h-4 sm:w-5 h-5" />
            </button>
          </div>
        </div>
      ) : (
        <button 
          onClick={() => setIsOpen(true)}
          className="gradient-bg w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center text-white shadow-2xl hover:scale-110 active:scale-90 transition-all aura-glow border border-white/20"
        >
          <MessageSquare className="w-5 h-5 sm:w-7 h-7" />
        </button>
      )}
    </div>
  );
};

export default SmartAssistant;
