/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, Crown, Sparkles, User, Info, MessageSquare } from 'lucide-react';
import { EXPERTS } from './constants';
import { Message, UserContext } from './types';
import { geminiService } from './services/geminiService';
import { cn, parseExperts, cleanResponse } from './lib/utils';

export default function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);
  const [activeExperts, setActiveExperts] = useState<string[]>([]);
  
  // User Profile State
  const [userContext, setUserContext] = useState<UserContext>({
    name: 'Kenneth',
    background: 'Industrial Mathematics, algorithmic trading',
    stage: 'Building first product',
    goal: 'Monetize skills and land remote clients',
    location: 'Nigeria'
  });
  const [showProfile, setShowProfile] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    setShowWelcome(false);
    setActiveExperts([]);

    try {
      const chatHistory = [...messages, userMessage];
      const responseText = await geminiService.getChatResponse(chatHistory, userContext);
      
      const parsedExperts = parseExperts(responseText);
      const cleanContent = cleanResponse(responseText);
      
      const assistantMessage: Message = { 
        role: 'assistant', 
        content: cleanContent,
        experts: parsedExperts
      };
      
      setMessages(prev => [...prev, assistantMessage]);
      setActiveExperts(parsedExperts);
    } catch (error) {
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: "The board was interrupted. Please try again." 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const getExpertConfig = (name: string) => {
    return EXPERTS.find(e => 
      name.toLowerCase().includes(e.short.toLowerCase()) || 
      name.toLowerCase().includes(e.name.toLowerCase())
    );
  };

  return (
    <div className="relative flex flex-col h-screen overflow-hidden">
      <div className="bg-grain" />
      <div className="top-glow" />

      <div className="relative z-20 flex flex-col h-full">
        {/* Header */}
        <header className="pt-10 pb-5 text-center">
          <div className="text-2xl mb-1">👑</div>
          <h1 className="text-3xl tracking-[0.2em] text-gold font-normal font-serif">THE BILLION DOLLAR BOARD</h1>
          <p className="text-[10px] text-white/50 uppercase tracking-[0.2em] mt-2 font-sans">8 Legends &middot; 1 Boardroom &middot; Your Unfair Advantage</p>
        </header>

        {/* Expert Nav */}
        <nav className="flex flex-wrap justify-center gap-2 px-10 pb-5">
          {EXPERTS.map((expert) => {
            const isActive = activeExperts.some(name => 
              name.toLowerCase().includes(expert.short.toLowerCase())
            );
            return (
              <motion.div
                key={expert.id}
                style={{ 
                  '--expert-color': expert.color,
                  '--expert-glow': `${expert.color}4D` 
                } as React.CSSProperties}
                className={cn("expert-pill", isActive && "active")}
              >
                <span className="text-xs">{expert.emoji}</span>
                <span className="text-[11px] font-bold text-white uppercase tracking-wider">{expert.short}</span>
              </motion.div>
            );
          })}
        </nav>

        {/* Main Chat Area */}
        <main ref={scrollRef} className="flex-1 overflow-y-auto px-10 md:px-20 py-6 space-y-8 no-scrollbar scroll-smooth">
          <AnimatePresence>
            {showWelcome ? (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col items-center justify-center min-h-full text-center max-w-2xl mx-auto space-y-10"
              >
                <div className="space-y-4">
                  <blockquote className="text-2xl font-serif italic text-white/80 leading-relaxed">
                    "Assemble the greatest minds ever to lived, and they will build your future for you."
                  </blockquote>
                  <div className="h-px w-24 bg-gold/30 mx-auto" />
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
                  {EXPERTS.map((e) => (
                    <div 
                      key={e.id} 
                      className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-gold/30 transition-all hover:scale-105 cursor-default group"
                    >
                      <span className="text-2xl mb-2 block group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)] transition-all">{e.emoji}</span>
                      <h3 className="text-[10px] font-bold uppercase tracking-tighter" style={{ color: e.color }}>{e.name}</h3>
                      <p className="text-[9px] text-white/30">{e.title}</p>
                    </div>
                  ))}
                </div>

                <div className="flex items-center gap-2 text-[10px] text-gold uppercase tracking-[0.3em] font-bold animate-pulse">
                  <Sparkles size={12} />
                  Initiate Strategic Protocol
                </div>
              </motion.div>
            ) : (
              messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={cn(
                    "flex flex-col",
                    msg.role === 'user' ? "items-end" : "items-start"
                  )}
                >
                  <div className={cn(
                    "relative",
                    msg.role === 'user' ? "message-user" : "message-ai"
                  )}
                  style={msg.role === 'assistant' ? { 
                    '--expert-color': msg.experts?.[0] ? getExpertConfig(msg.experts[0])?.color || '#C9A84C' : '#C9A84C' 
                  } as React.CSSProperties : {}}>
                    
                    {msg.role === 'assistant' && msg.experts && (
                      <div className="flex gap-2 mb-3">
                        {msg.experts.map(name => {
                          const expert = getExpertConfig(name);
                          if (!expert) return null;
                          return (
                            <span 
                              key={expert.id}
                              className="px-2 py-0.5 rounded bg-white/10 text-[9px] font-black uppercase tracking-widest text-white border border-white/5"
                              style={{ backgroundColor: `${expert.color}33` }}
                            >
                              {expert.name}
                            </span>
                          );
                        })}
                      </div>
                    )}
                    
                    <div className={cn(
                      "text-[15px] leading-[1.6]",
                      msg.role === 'assistant' ? "font-serif text-white/90" : "text-white"
                    )}>
                      {msg.content}
                    </div>
                  </div>
                </motion.div>
              ))
            )}

            {isLoading && (
              <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                className="flex items-center gap-3 py-4"
              >
                <div className="flex gap-1.5">
                  {[0, 1, 2].map(i => (
                    <motion.div
                      key={i}
                      animate={{ scale: [1, 1.5, 1], opacity: [0.3, 1, 0.3] }}
                      transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                      className="w-1.5 h-1.5 bg-gold rounded-full"
                    />
                  ))}
                </div>
                <span className="text-gold/60 text-xs font-serif italic tracking-widest uppercase">Consulting the Board...</span>
              </motion.div>
            )}
          </AnimatePresence>
        </main>

        {/* Input Bar */}
        <footer className="h-[120px] px-10 md:px-20 border-t border-gold/20 bg-background flex items-center gap-4">
          <div className="flex-1 h-14 bg-white/5 border border-gold/30 rounded-xl px-5 flex items-center group focus-within:border-gold/60 transition-all shadow-[inset_0_0_20px_rgba(201,168,76,0.05)]">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              placeholder="Ask the Board for $5M worth of consulting..."
              className="flex-1 bg-transparent resize-none border-none focus:ring-0 text-sm text-white/80 placeholder:text-white/20 h-5"
            />
          </div>
          
          <button
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className="w-14 h-14 bg-gold rounded-full flex items-center justify-center text-background hover:scale-105 active:scale-95 transition-all disabled:opacity-30 disabled:grayscale group shadow-[0_0_20px_rgba(201,168,76,0.2)]"
          >
            <Send size={20} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>

          <button 
            onClick={() => setShowProfile(!showProfile)} 
            className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[9px] text-gold/30 flex items-center gap-1 hover:text-gold transition-colors font-bold tracking-[0.2em] uppercase"
          >
            <User size={8} />
            Secure Board Context: {userContext.name}
          </button>
        </footer>
      </div>

      {/* Profile Modal */}
      <AnimatePresence>
        {showProfile && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-background/90 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div 
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="bg-surface border border-gold/30 p-6 rounded-3xl max-w-md w-full space-y-6"
            >
              <div className="flex items-center gap-3 border-b border-gold/10 pb-4">
                <Crown size={20} className="text-gold" />
                <h2 className="text-xl text-gold uppercase tracking-widest font-bold">USER CONTEXT</h2>
              </div>
              
              <div className="space-y-4">
                {(Object.keys(userContext) as Array<keyof UserContext>).map((key) => (
                  <div key={key} className="space-y-1">
                    <label className="text-[10px] font-bold text-gold/60 uppercase tracking-wider">{key}</label>
                    <input 
                      type="text"
                      value={userContext[key]}
                      onChange={(e) => setUserContext(prev => ({ ...prev, [key]: e.target.value }))}
                      className="w-full bg-background border border-gold/10 rounded-lg p-2 text-xs text-white focus:border-gold/50 transition-colors"
                    />
                  </div>
                ))}
              </div>

              <button 
                onClick={() => setShowProfile(false)}
                className="w-full py-3 bg-gold text-background rounded-xl font-bold text-xs uppercase tracking-widest transition-transform active:scale-95"
              >
                Save & Secure Context
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
