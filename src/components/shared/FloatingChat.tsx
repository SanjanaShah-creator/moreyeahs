'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Bot, User } from 'lucide-react';

const CHAT_API =
  (typeof process !== 'undefined' && process.env?.NEXT_PUBLIC_CHATBOT_CHAT_API_URL) ||
  'https://newchatbot.moreyeahs.com/chat';

interface Message { id: string; role: 'user' | 'assistant'; content: string }

function uid() { return Math.random().toString(36).slice(2, 9); }

const SUGGESTED = [
  'Tell me about your AI solutions',
  'I want to book a consultation',
  'What industries do you serve?',
];

export default function FloatingChat() {
  const [open, setOpen]         = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput]       = useState('');
  const [thinking, setThinking] = useState(false);
  const sessionId               = useRef(uid() + uid());
  const bottomRef               = useRef<HTMLDivElement>(null);
  const inputRef                = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 220);
  }, [open]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, thinking]);

  const send = useCallback(async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || thinking) return;

    const userMsg: Message = { id: uid(), role: 'user', content: trimmed };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setThinking(true);

    try {
      const res = await fetch(CHAT_API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: trimmed, session_id: sessionId.current }),
      });
      let reply = "I'm having trouble connecting right now. Please reach us at info@moreyeahs.com.";
      if (res.ok) {
        const data = await res.json();
        reply = data.response ?? data.message ?? data.reply ?? data.answer ?? reply;
      }
      setMessages(prev => [...prev, { id: uid(), role: 'assistant', content: reply }]);
    } catch {
      setMessages(prev => [...prev, { id: uid(), role: 'assistant', content: "I'm having trouble connecting right now. Please try again or reach us at info@moreyeahs.com." }]);
    } finally {
      setThinking(false);
    }
  }, [thinking]);

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(input); }
  };

  const hasMessages = messages.length > 0;
  const hasUnread   = !open && hasMessages && messages[messages.length - 1].role === 'assistant';

  return (
    <div style={{ position: 'fixed', bottom: 28, right: 28, zIndex: 200 }}>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 16 }}
            transition={{ duration: 0.22, ease: [0.25, 0.1, 0.25, 1] }}
            className="chat-panel"
            style={{
              position: 'absolute', bottom: 68, right: 0,
              width: 360, height: 530,
              borderRadius: 20, overflow: 'hidden',
              display: 'flex', flexDirection: 'column',
              background: 'var(--card-bg)',
              border: '1px solid var(--card-border)',
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
              boxShadow: '0 24px 64px rgba(0,0,0,0.28)',
            }}
          >
            {/* Header */}
            <div className="chat-header-mobile" style={{ background: 'linear-gradient(135deg,#1A56DB,#4D86F5)', padding: '15px 16px', display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: 'rgba(255,255,255,0.18)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Bot size={16} color="#fff" strokeWidth={1.5} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#fff' }}>MoreYeahs AI</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 11, color: 'rgba(255,255,255,0.75)' }}>
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#22c55e', display: 'inline-block' }} />
                  Online · Replies instantly
                </div>
              </div>
              <button onClick={() => setOpen(false)}
                style={{ background: 'rgba(255,255,255,0.15)', border: 'none', borderRadius: 8, width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#fff' }}
                onMouseEnter={e => ((e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.28)')}
                onMouseLeave={e => ((e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.15)')}>
                <X size={14} strokeWidth={2} />
              </button>
            </div>

            {/* Messages */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '14px 14px 8px', display: 'flex', flexDirection: 'column', gap: 10 }}>
              {/* Welcome state */}
              {!hasMessages && (
                <>
                  <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                    <div style={{ width: 28, height: 28, borderRadius: 8, background: 'linear-gradient(135deg,#1A56DB,#4D86F5)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 2 }}>
                      <Bot size={13} color="#fff" strokeWidth={1.5} />
                    </div>
                    <div style={{ background: 'rgba(26,86,219,0.08)', border: '1px solid rgba(77,134,245,0.15)', borderRadius: '4px 14px 14px 14px', padding: '10px 13px', fontSize: 13, color: 'var(--fg-2)', lineHeight: 1.65, maxWidth: 256 }}>
                      👋 Hi! I&apos;m the MoreYeahs AI assistant. Ask me anything about our services or how we can help your business.
                    </div>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginTop: 4, paddingLeft: 36 }}>
                    {SUGGESTED.map(q => (
                      <button key={q} onClick={() => send(q)}
                        style={{ textAlign: 'left', padding: '8px 12px', borderRadius: 10, border: '1px solid var(--border)', background: 'var(--surface)', fontSize: 12, fontWeight: 500, color: 'var(--fg-2)', cursor: 'pointer', transition: 'border-color 0.15s, color 0.15s' }}
                        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(26,86,219,0.35)'; (e.currentTarget as HTMLElement).style.color = '#4D86F5'; }}
                        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)'; (e.currentTarget as HTMLElement).style.color = 'var(--fg-2)'; }}>
                        {q}
                      </button>
                    ))}
                  </div>
                </>
              )}

              {/* Conversation */}
              {messages.map(msg => (
                <div key={msg.id} style={{ display: 'flex', gap: 8, alignItems: 'flex-start', flexDirection: msg.role === 'user' ? 'row-reverse' : 'row' }}>
                  <div style={{ width: 28, height: 28, borderRadius: 8, flexShrink: 0, marginTop: 2, background: msg.role === 'user' ? 'rgba(26,86,219,0.12)' : 'linear-gradient(135deg,#1A56DB,#4D86F5)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {msg.role === 'user'
                      ? <User size={13} color="#4D86F5" strokeWidth={1.5} />
                      : <Bot  size={13} color="#fff"    strokeWidth={1.5} />}
                  </div>
                  <div style={{ background: msg.role === 'user' ? '#1A56DB' : 'rgba(26,86,219,0.08)', border: msg.role === 'user' ? 'none' : '1px solid rgba(77,134,245,0.15)', borderRadius: msg.role === 'user' ? '14px 4px 14px 14px' : '4px 14px 14px 14px', padding: '10px 13px', fontSize: 13, color: msg.role === 'user' ? '#fff' : 'var(--fg-2)', lineHeight: 1.65, maxWidth: 256 }}>
                    {msg.content}
                  </div>
                </div>
              ))}

              {/* Typing indicator */}
              {thinking && (
                <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                  <div style={{ width: 28, height: 28, borderRadius: 8, background: 'linear-gradient(135deg,#1A56DB,#4D86F5)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Bot size={13} color="#fff" strokeWidth={1.5} />
                  </div>
                  <div style={{ background: 'rgba(26,86,219,0.08)', border: '1px solid rgba(77,134,245,0.15)', borderRadius: '4px 14px 14px 14px', padding: '12px 16px', display: 'flex', gap: 5, alignItems: 'center' }}>
                    {[0, 1, 2].map(i => (
                      <span key={i} style={{ width: 6, height: 6, borderRadius: '50%', background: '#4D86F5', display: 'inline-block', animation: `chatBounce 1.2s ease-in-out ${i * 0.2}s infinite` }} />
                    ))}
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Input row */}
            <div className="chat-input-row-mobile" style={{ padding: '8px 12px 13px', borderTop: '1px solid var(--border)', display: 'flex', gap: 8, flexShrink: 0, background: 'var(--card-bg)' }}>
              <input
                ref={inputRef} type="text" placeholder="Type a message…"
                value={input} onChange={e => setInput(e.target.value)} onKeyDown={onKeyDown}
                disabled={thinking}
                style={{ flex: 1, padding: '10px 13px', borderRadius: 12, border: '1px solid var(--border)', background: 'var(--surface)', color: 'var(--fg)', fontSize: 13, outline: 'none', fontFamily: 'inherit' }}
                onFocus={e => (e.target.style.borderColor = 'rgba(26,86,219,0.4)')}
                onBlur={e => (e.target.style.borderColor = 'var(--border)')}
              />
              <button
                onClick={() => send(input)} disabled={!input.trim() || thinking}
                style={{ width: 38, height: 38, borderRadius: 10, background: input.trim() && !thinking ? '#1A56DB' : 'rgba(26,86,219,0.15)', border: 'none', cursor: input.trim() && !thinking ? 'pointer' : 'default', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'background 0.15s' }}
                onMouseEnter={e => { if (input.trim() && !thinking) (e.currentTarget as HTMLElement).style.background = '#0E2E75'; }}
                onMouseLeave={e => { if (input.trim() && !thinking) (e.currentTarget as HTMLElement).style.background = '#1A56DB'; }}>
                <Send size={15} color={input.trim() && !thinking ? '#fff' : '#4D86F5'} strokeWidth={1.5} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle button — hidden on mobile when chat is open */}
      <div style={{ position: 'relative' }} className={open ? 'chat-fab-hidden' : ''}>
        <motion.button
          onClick={() => setOpen(o => !o)}
          whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.94 }}
          style={{ width: 56, height: 56, borderRadius: '50%', background: 'linear-gradient(135deg,#1A56DB,#4D86F5)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 28px rgba(26,86,219,0.45)', color: '#fff' }}
          aria-label={open ? 'Close chat' : 'Open chat'}
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.span key={open ? 'close' : 'open'} initial={{ opacity: 0, rotate: -90, scale: 0.6 }} animate={{ opacity: 1, rotate: 0, scale: 1 }} exit={{ opacity: 0, rotate: 90, scale: 0.6 }} transition={{ duration: 0.18 }} style={{ display: 'flex' }}>
              {open ? <X size={20} strokeWidth={1.5} /> : <MessageCircle size={20} strokeWidth={1.5} />}
            </motion.span>
          </AnimatePresence>
        </motion.button>
        {hasUnread && (
          <div style={{ position: 'absolute', top: 0, right: 0, width: 13, height: 13, borderRadius: '50%', background: '#22c55e', border: '2px solid white', pointerEvents: 'none' }} />
        )}
      </div>

      <style>{`
        @keyframes chatBounce {
          0%, 60%, 100% { transform: translateY(0); }
          30% { transform: translateY(-5px); }
        }

        /* ── Mobile: full-screen sheet with rounded top corners ── */
        @media(max-width:640px) {
          /* Wrapper sits at bottom-right; on mobile we override the panel only */
          .chat-panel {
            position: fixed !important;
            top: 12px !important;
            left: 12px !important;
            right: 12px !important;
            bottom: 0 !important;
            width: auto !important;
            height: auto !important;
            max-height: calc(100dvh - 12px) !important;
            border-radius: 20px 20px 0 0 !important;
            transform: none !important;
          }

          /* Header: add top safe-area inset so it clears the status bar */
          .chat-header-mobile {
            padding-top: max(15px, env(safe-area-inset-top)) !important;
            border-radius: 20px 20px 0 0 !important;
          }

          /* Input row: add bottom safe-area so it clears the home indicator */
          .chat-input-row-mobile {
            padding-bottom: max(13px, env(safe-area-inset-bottom)) !important;
          }

          /* Hide the toggle FAB while chat is open on mobile */
          .chat-fab-hidden {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
}
