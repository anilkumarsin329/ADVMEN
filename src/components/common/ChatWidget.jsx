/**
 * components/common/ChatWidget.jsx
 * ─────────────────────────────────────────────────────────────
 * ADVMEN Technologies — AI Assistant Chat Widget (Groq LLM Powered)
 * ─────────────────────────────────────────────────────────────
 */

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiMessageCircle, FiX, FiSend } from 'react-icons/fi'
import { API_BASE_URL } from '@utils/constants'

const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY || ''

const SYSTEM_PROMPT = `You are ADVMEN AI, the official AI customer support & technology consultant for ADVMEN Technologies.
ADVMEN Technologies is a premier IT solutions and digital agency offering:
- Custom Web & Web Application Development (React, Node.js, Next.js, MERN Stack)
- Mobile App Development (iOS & Android using React Native & Flutter)
- Digital Marketing, Performance Marketing, Social Media Strategy & SEO
- Brand Identity Design, Graphic Design & Creative Visual Systems
- Media Production, Video Editing & Content Creation
- Corporate & Political Campaign Management

Official Company Contacts:
- Email: info@advmen.com
- Phone / WhatsApp: +91 95196 02401
- Location: Jharsa Village, Sector 38, Gurugram (Gurgaon), Haryana, India

Guidelines for AI:
1. Always be polite, professional, concise, and helpful.
2. Give clean, well-formatted answers (use bullet points when listing services or features).
3. Always suggest contacting info@advmen.com or +91 95196 02401 for custom quotes or project discussions.`

const ChatWidget = () => {
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [messages, setMessages] = useState([
    { id: 1, type: 'bot', text: 'Hello! Welcome to ADVMEN Technologies. How can we assist you today?' }
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const callGroqAPI = async (userQuery, conversationHistory) => {
    try {
      // 1. Primary Call: Backend AI endpoint /api/chat
      const backendRes = await fetch(`${API_BASE_URL}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userQuery, history: conversationHistory }),
      })

      if (backendRes.ok) {
        const data = await backendRes.json()
        if (data.success && data.reply) {
          return data.reply
        }
      }
    } catch (err) {
      console.warn('Backend AI endpoint call failed, attempting direct Groq API:', err)
    }

    // 2. Fallback Direct Groq API Call
    const historyFormatted = conversationHistory
      .slice(-6)
      .map((m) => ({
        role: m.type === 'user' ? 'user' : 'assistant',
        content: m.text,
      }))

    const apiMessages = [
      { role: 'system', content: SYSTEM_PROMPT },
      ...historyFormatted,
      { role: 'user', content: userQuery },
    ]

    try {
      const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${GROQ_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'llama-3.3-70b-versatile',
          messages: apiMessages,
          temperature: 0.7,
          max_tokens: 400,
        }),
      })

      if (res.ok) {
        const data = await res.json()
        const aiText = data.choices?.[0]?.message?.content
        if (aiText) return aiText
      }
    } catch (err) {
      console.warn('Groq AI API error, switching to local Hinglish NLP engine:', err)
    }

    // 3. Local Hinglish NLP Engine
    const msg = userQuery.toLowerCase().trim()
    if (msg.includes('tum kon') || msg.includes('aap kon') || msg.includes('kon ho') || msg.includes('who are you')) {
      return 'Main ADVMEN Technologies ka Smart AI Assistant hu! Main aapko Web/App Development, Digital Marketing, Internships aur hiring processes ke baare me jankari deta hu. Aap kya janna chahte hain?'
    }
    if (msg.includes('service') || msg.includes('kya karte') || msg.includes('what do you do') || msg.includes('work')) {
      return 'Hum offer karte hain:\n• Web & Web App Development (MERN, React, Next.js)\n• Mobile App Development (iOS & Android)\n• Digital Marketing & SEO\n• Branding & Media Production\n\nContact us: info@advmen.com | +91 95196 02401'
    }
    if (msg.includes('contact') || msg.includes('email') || msg.includes('phone') || msg.includes('number') || msg.includes('location')) {
      return 'Official Contact Details:\n• Email: info@advmen.com\n• Phone/WhatsApp: +91 95196 02401\n• Address: Sector 38, Gurugram, Haryana'
    }
    if (msg.includes('job') || msg.includes('career') || msg.includes('intern') || msg.includes('apply')) {
      return 'Careers page par jaakar Internship aur Full-Time roles ke liye apply karein. Apply karte hi Intern candidates ko official WhatsApp group link milega!'
    }
    if (msg.includes('price') || msg.includes('cost') || msg.includes('rate') || msg.includes('kitna')) {
      return 'Pricing project requirement ke anusar calculate hoti hai. Custom quote ke liye info@advmen.com par email karein ya +91 95196 02401 par call karein.'
    }
    return 'ADVMEN Technologies me aapka swagat hai! Kisi bhi project inquiry ke liye info@advmen.com par email karein ya +91 95196 02401 par call/WhatsApp karein.'
  }

  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) return

    const userQuery = input.trim()
    const userMessage = {
      id: Date.now(),
      type: 'user',
      text: userQuery,
    }

    setMessages((prev) => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    const aiResponseText = await callGroqAPI(userQuery, messages)

    const botMessage = {
      id: Date.now() + 1,
      type: 'bot',
      text: aiResponseText,
    }

    setMessages((prev) => [...prev, botMessage])
    setIsLoading(false)
  }

  return (
    <div className="fixed bottom-8 left-5 z-50" style={{ pointerEvents: 'auto' }}>
      {/* Chat Window */}
      <AnimatePresence>
        {isChatOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 20 }}
            className="absolute bottom-20 left-0 w-80 sm:w-96 max-h-[460px] rounded-2xl shadow-2xl overflow-hidden flex flex-col"
            style={{
              background: '#121420',
              border: '1px solid rgba(255, 107, 0, 0.3)',
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.6)',
            }}
          >
            {/* Header */}
            <div
              className="p-4 border-b flex justify-between items-center bg-[#181b2c]"
              style={{ borderColor: 'rgba(255, 107, 0, 0.2)' }}
            >
              <div>
                <h3 className="font-bold text-white text-base flex items-center gap-2 font-display">
                  <FiMessageCircle size={18} className="text-orange-500" />
                  Let's Talk
                </h3>
                <p className="text-[11px] text-slate-400">ADVMEN Smart AI Support</p>
              </div>
              <button
                onClick={() => setIsChatOpen(false)}
                className="text-slate-400 hover:text-white transition-colors"
              >
                <FiX size={20} />
              </button>
            </div>

            {/* Messages Container */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 max-h-[320px] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] px-3.5 py-2.5 rounded-2xl text-xs leading-relaxed whitespace-pre-wrap ${
                      msg.type === 'user'
                        ? 'bg-orange-600 text-white rounded-br-none shadow-md font-medium'
                        : 'bg-[#1c2033] text-slate-200 border border-slate-700/60 rounded-bl-none font-sans'
                    }`}
                  >
                    {msg.text}
                  </div>
                </motion.div>
              ))}
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex gap-1.5 p-2 bg-[#1c2033] rounded-xl w-16 border border-slate-700/60"
                >
                  <div className="w-2 h-2 rounded-full bg-orange-500 animate-bounce" />
                  <div className="w-2 h-2 rounded-full bg-orange-500 animate-bounce" style={{ animationDelay: '0.15s' }} />
                  <div className="w-2 h-2 rounded-full bg-orange-500 animate-bounce" style={{ animationDelay: '0.3s' }} />
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Box */}
            <div
              className="p-3 border-t bg-[#161826] flex gap-2"
              style={{ borderColor: 'rgba(255, 107, 0, 0.2)' }}
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Ask ADVMEN AI anything..."
                disabled={isLoading}
                className="flex-1 bg-[#1e2235] border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-400 outline-none focus:border-orange-500 transition-colors font-medium"
              />
              <button
                onClick={handleSendMessage}
                disabled={isLoading || !input.trim()}
                className="px-3 py-2 rounded-xl bg-orange-600 hover:bg-orange-500 text-white disabled:opacity-50 transition-all flex items-center justify-center cursor-pointer shadow-md"
              >
                <FiSend size={15} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Floating "Let's Talk" Button */}
      <motion.button
        className="px-5 py-3 rounded-full flex items-center justify-center gap-2 shadow-xl text-white font-semibold text-sm backdrop-blur-md border transition-all cursor-pointer"
        style={{
          background: 'linear-gradient(135deg, rgba(249, 115, 22, 0.9) 0%, rgba(234, 88, 12, 0.95) 100%)',
          borderColor: 'rgba(255, 255, 255, 0.2)',
          boxShadow: '0 8px 25px rgba(249, 115, 22, 0.4)',
        }}
        onClick={() => setIsChatOpen(!isChatOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {isChatOpen ? <FiX size={18} /> : <FiMessageCircle size={18} />}
        {!isChatOpen && <span className="font-mono text-xs uppercase tracking-wider font-bold">Let's Talk</span>}
      </motion.button>
    </div>
  )
}

export default ChatWidget
