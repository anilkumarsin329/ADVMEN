import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiMessageCircle, FiX, FiSend } from 'react-icons/fi'

const ChatWidget = () => {
  const [showMenu, setShowMenu] = useState(false)
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [messages, setMessages] = useState([
    { id: 1, type: 'bot', text: 'Hi! 👋 How can we help you today?' }
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

  const handleSendMessage = () => {
    if (!input.trim()) return

    const userMessage = {
      id: Date.now(),
      type: 'user',
      text: input,
    }
    setMessages((prev) => [...prev, userMessage])
    const userInput = input
    setInput('')
    setIsLoading(true)

    // Mock AI responses
    setTimeout(() => {
      const msg = userInput.toLowerCase()
      let response = 'Thanks for reaching out! For more details, contact us at hello@advmen.com or call +91 00000 00000'
      
      if (msg.includes('service')) response = 'We offer: Branding, Web Development, App Development, Digital Marketing, SEO, Content Creation, Media Production, Political Campaigns, and Advertising.'
      else if (msg.includes('price') || msg.includes('cost')) response = 'Pricing varies based on project scope. Contact us at hello@advmen.com for a custom quote.'
      else if (msg.includes('contact') || msg.includes('email')) response = 'Email: hello@advmen.com | Phone: +91 00000 00000 | WhatsApp available in menu'
      else if (msg.includes('portfolio') || msg.includes('project')) response = 'We have completed 150+ projects for clients worldwide. Visit our portfolio page!'
      else if (msg.includes('team')) response = 'Our team has 25+ experienced professionals including designers, developers, and strategists.'
      else if (msg.includes('process') || msg.includes('how')) response = 'Our process: Discovery → Strategy → Design → Development → Testing → Launch → Support'
      else if (msg.includes('hello') || msg.includes('hi')) response = 'Hello! Welcome to ADVMEN Technologies. How can we assist you today?'
      else if (msg.includes('thank')) response = 'You\'re welcome! Feel free to ask any other questions about our services.'
      
      const botMessage = {
        id: Date.now() + 1,
        type: 'bot',
        text: response,
      }
      setMessages((prev) => [...prev, botMessage])
      setIsLoading(false)
    }, 1000)
  }

  return (
    <div className="fixed bottom-8 left-5 z-50" style={{ pointerEvents: 'auto' }}>
      {/* Menu Options */}
      <AnimatePresence>
        {showMenu && !isChatOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            className="absolute bottom-16 left-0 rounded-2xl shadow-lg backdrop-blur-md p-3 space-y-2"
            style={{
              background: 'rgba(15, 15, 15, 0.7)',
              border: '1.5px solid rgba(255, 107, 0, 0.4)',
            }}
          >
            <button
              onClick={() => {
                setIsChatOpen(true)
                setShowMenu(false)
              }}
              className="w-full px-4 py-2 rounded-lg text-white font-semibold text-sm whitespace-nowrap hover:bg-orange-500/20 transition-all border border-orange-400/30"
            >
              💬 Chat with AI
            </button>
            <a
              href="https://wa.me/918375008009?text=Hi%20ADVMEN%20Technologies%2C%20I%20would%20like%20to%20know%20more%20about%20your%20services."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full px-4 py-2 rounded-lg text-white font-semibold text-sm whitespace-nowrap hover:bg-green-500/20 transition-all border border-green-400/30 text-center block"
            >
              📱 WhatsApp
            </a>
            <a
              href="tel:+918375008009"
              className="w-full px-4 py-2 rounded-lg text-white font-semibold text-sm whitespace-nowrap hover:bg-blue-500/20 transition-all border border-blue-400/30 text-center block"
            >
              ☎️ Call Us
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isChatOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="absolute bottom-20 left-0 w-80 max-h-96 rounded-2xl shadow-2xl overflow-hidden flex flex-col"
            style={{
              background: '#0a0a0a',
              border: '1px solid rgba(255,107,0,0.2)',
              backdropFilter: 'blur(12px)',
            }}
          >
            {/* Header */}
            <div
              className="p-4 border-b flex justify-between items-center"
              style={{ borderColor: 'rgba(255,107,0,0.15)' }}
            >
              <div>
                <h3 className="font-bold text-white text-lg">Let's Talk</h3>
                <p className="text-xs text-gray-400 mt-1">ADVMEN Support</p>
              </div>
              <button
                onClick={() => setIsChatOpen(false)}
                className="text-white hover:text-orange-500"
              >
                <FiX size={20} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs px-3 py-2 rounded-lg text-sm leading-relaxed ${
                      msg.type === 'user'
                        ? 'bg-orange-500 text-white'
                        : 'bg-gray-800 text-gray-200 border border-orange-500/20'
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
                  className="flex gap-1"
                >
                  <div className="w-2 h-2 rounded-full bg-orange-500 animate-bounce" />
                  <div className="w-2 h-2 rounded-full bg-orange-500 animate-bounce" style={{ animationDelay: '0.1s' }} />
                  <div className="w-2 h-2 rounded-full bg-orange-500 animate-bounce" style={{ animationDelay: '0.2s' }} />
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div
              className="p-3 border-t flex gap-2"
              style={{ borderColor: 'rgba(255,107,0,0.15)' }}
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Type message..."
                disabled={isLoading}
                className="flex-1 bg-gray-800 border border-orange-500/20 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-orange-500"
              />
              <button
                onClick={handleSendMessage}
                disabled={isLoading || !input.trim()}
                className="p-2 rounded-lg bg-orange-500 text-white hover:bg-orange-600 disabled:opacity-50"
              >
                <FiSend size={16} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Button */}
      <motion.button
        className="px-5 py-3 rounded-full flex items-center justify-center gap-2 shadow-lg text-white font-semibold text-sm backdrop-blur-md border transition-all"
        style={{
          background: 'linear-gradient(135deg, rgba(255, 107, 0, 0.3) 0%, rgba(255, 140, 56, 0.2) 100%)',
          borderColor: 'rgba(255, 107, 0, 0.5)',
        }}
        onClick={() => {
          if (isChatOpen) {
            setIsChatOpen(false)
          } else {
            setShowMenu(!showMenu)
          }
        }}
        whileHover={{ scale: 1.05, borderColor: 'rgba(255, 107, 0, 0.8)' }}
        whileTap={{ scale: 0.95 }}
      >
        {isChatOpen || showMenu ? <FiX size={20} /> : <FiMessageCircle size={20} />}
        {!isChatOpen && !showMenu && <span>Let's Talk</span>}
      </motion.button>
    </div>
  )
}

export default ChatWidget
