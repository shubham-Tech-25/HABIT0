import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle, X, Send, Bot, User, Loader2, Sparkles } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { cn } from '../lib/utils';

import { useChat } from '../context/ChatContext';

export const Chatbot = () => {
  const { isOpen, setIsOpen } = useChat();
  const [messages, setMessages] = useState<{ role: 'user' | 'bot'; text: string }[]>([
    { role: 'bot', text: "Hi! I'm your Habito Assistant. How can I help you with your habits or goals today?" }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsTyping(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: userMessage,
        config: {
          systemInstruction: "You are the Habito AI Assistant. Help users with habit suggestions, productivity advice, goal planning, and motivation. Keep responses concise, encouraging, and focused on self-improvement. You are part of the Habito app, which tracks habits, goals, and discipline.",
        },
      });

      const botResponse = response.text || "I'm sorry, I couldn't process that. How else can I help?";
      setMessages(prev => [...prev, { role: 'bot', text: botResponse }]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'bot', text: "I'm having trouble connecting right now. Please try again later!" }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="absolute bottom-20 right-0 w-[350px] md:w-[400px] h-[500px] glass overflow-hidden flex flex-col shadow-2xl border-white/10"
          >
            {/* Header */}
            <div className="p-4 bg-neon-green text-dark-bg flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-dark-bg/20 rounded-lg flex items-center justify-center">
                  <Bot size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-sm">Habito Assistant</h3>
                  <div className="flex items-center gap-1">
                    <div className="w-1.5 h-1.5 bg-dark-bg/40 rounded-full animate-pulse" />
                    <span className="text-[10px] font-bold uppercase tracking-widest opacity-60">Online</span>
                  </div>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="p-1 hover:bg-dark-bg/10 rounded-md transition-colors">
                <X size={20} />
              </button>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide">
              {messages.map((msg, i) => (
                <div key={i} className={cn("flex gap-3", msg.role === 'user' ? "flex-row-reverse" : "")}>
                  <div className={cn(
                    "w-8 h-8 rounded-lg flex items-center justify-center shrink-0",
                    msg.role === 'user' ? "bg-blue-500/10 text-blue-500" : "bg-neon-green/10 text-neon-green"
                  )}>
                    {msg.role === 'user' ? <User size={16} /> : <Sparkles size={16} />}
                  </div>
                  <div className={cn(
                    "p-3 rounded-2xl text-sm leading-relaxed",
                    msg.role === 'user' ? "bg-white/5 text-white/90 rounded-tr-none" : "bg-neon-green/5 text-white/90 rounded-tl-none border border-neon-green/10"
                  )}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex gap-3">
                  <div className="w-8 h-8 bg-neon-green/10 text-neon-green rounded-lg flex items-center justify-center">
                    <Loader2 size={16} className="animate-spin" />
                  </div>
                  <div className="bg-neon-green/5 p-3 rounded-2xl rounded-tl-none border border-neon-green/10">
                    <div className="flex gap-1">
                      <div className="w-1.5 h-1.5 bg-neon-green/40 rounded-full animate-bounce" />
                      <div className="w-1.5 h-1.5 bg-neon-green/40 rounded-full animate-bounce [animation-delay:0.2s]" />
                      <div className="w-1.5 h-1.5 bg-neon-green/40 rounded-full animate-bounce [animation-delay:0.4s]" />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-4 border-t border-white/5">
              <div className="relative">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask anything..."
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-4 pr-12 focus:outline-none focus:border-neon-green transition-colors text-sm"
                />
                <button
                  onClick={handleSend}
                  disabled={!input.trim() || isTyping}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-neon-green hover:bg-neon-green/10 rounded-lg transition-colors disabled:opacity-50"
                >
                  <Send size={18} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "w-14 h-14 rounded-2xl flex items-center justify-center shadow-2xl transition-all duration-300",
          isOpen ? "bg-white text-dark-bg rotate-90" : "bg-neon-green text-dark-bg neon-glow"
        )}
      >
        {isOpen ? <X size={28} /> : <MessageCircle size={28} />}
      </motion.button>
    </div>
  );
};
