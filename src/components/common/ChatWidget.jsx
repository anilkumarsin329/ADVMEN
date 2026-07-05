import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiMessageCircle, FiX, FiSend, FiPhone, FiMessageSquare } from 'react-icons/fi'
import { SiWhatsapp } from 'react-icons/si'

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
      let response = 'Thanks for reaching out! For more details, contact us at hello@advmen.com or call +91 83750 08009'
      
      if (msg.includes('service') || msg.includes('what do you')) response = 'We offer: 🎨 Branding, 💻 Web Development, 📱 App Development, 📊 Digital Marketing, 🔍 SEO, ✍️ Content Creation, 🎬 Media Production, 🗳️ Political Campaigns, and 📢 Advertising.'
      else if (msg.includes('price') || msg.includes('cost') || msg.includes('how much')) response = 'Pricing varies based on project scope and requirements. Contact us at hello@advmen.com or WhatsApp +91 83750 08009 for a custom quote.'
      else if (msg.includes('contact') || msg.includes('email') || msg.includes('phone')) response = '📧 Email: hello@advmen.com\n📞 Phone: +91 83750 08009\n💬 WhatsApp: Available in the menu above'
      else if (msg.includes('portfolio') || msg.includes('project') || msg.includes('work')) response = 'We have completed 150+ projects for clients worldwide. Visit our portfolio page to see our latest work!'
      else if (msg.includes('team') || msg.includes('who')) response = 'Our team has 25+ experienced professionals including designers, developers, strategists, and marketers.'
      else if (msg.includes('process') || msg.includes('how do you work')) response = 'Our process: 1️⃣ Discovery → 2️⃣ Strategy → 3️⃣ Design → 4️⃣ Development → 5️⃣ Testing → 6️⃣ Launch → 7️⃣ Support'
      else if (msg.includes('hello') || msg.includes('hi') || msg.includes('hey')) response = 'Hello! 👋 Welcome to ADVMEN Technologies. How can we assist you today?'
      else if (msg.includes('thank')) response = 'You\'re welcome! 😊 Feel free to ask any other questions about our services.'
      else if (msg.includes('web') || msg.includes('website')) response = 'We specialize in creating stunning, high-performance websites that convert visitors into customers. Want to know more?'
      else if (msg.includes('app') || msg.includes('mobile')) response = 'We develop iOS and Android apps with beautiful UI/UX and robust backend. Let\'s discuss your app idea!'
      else if (msg.includes('marketing') || msg.includes('seo')) response = 'Our digital marketing and SEO services help your business rank higher and reach more customers online.'
      else if (msg.includes('branding') || msg.includes('logo')) response = 'We create memorable brand identities including logos, brand guidelines, and complete visual systems.'
      else if (msg.includes('timeline') || msg.includes('how long')) response = 'Project timelines vary based on complexity. Typically: Small projects 2-4 weeks, Medium 4-8 weeks, Large 8+ weeks.'
      else if (msg.includes('support') || msg.includes('maintenance')) response = 'We provide ongoing support and maintenance for all our projects. Your success is our priority!'
      
      const botMessage = {
        id: Date.now() + 1,
        type: 'bot',
        text: response,
      }
      setMessages((prev) => [...prev, botMessage])
      setIsLoading(false)
    }, 800)
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
              background: 'rgba(15, 15, 15, 0.8)',
              border: '1.5px solid rgba(255, 107, 0, 0.4)',
            }}
          >
            {/* Chat with AI */}
            <button
              onClick={() => {
                setIsChatOpen(true)
                setShowMenu(false)
              }}
              className="w-full px-4 py-2.5 rounded-lg text-white font-semibold text-sm whitespace-nowrap hover:bg-orange-500/20 transition-all border border-orange-400/30 flex items-center gap-2 justify-center"
            >
              <FiMessageSquare size={18} />
              Chat with AI
            </button>

            {/* WhatsApp */}
            <a
              href="https://wa.me/918375008009?text=Hi%20ADVMEN%20Technologies%2C%20I%20would%20like%20to%20know%20more%20about%20your%20services."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full px-4 py-2.5 rounded-lg text-white font-semibold text-sm whitespace-nowrap hover:bg-green-500/20 transition-all border border-green-400/30 text-center flex items-center gap-2 justify-center"
            >
              <SiWhatsapp size={18} />
              WhatsApp
            </a>

            {/* Call Us */}
            <a
              href="tel:+918375008009"
              className="w-full px-4 py-2.5 rounded-lg text-white font-semibold text-sm whitespace-nowrap hover:bg-blue-500/20 transition-all border border-blue-400/30 text-center flex items-center gap-2 justify-center"
            >
              <FiPhone size={18} />
              Call Us
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
                <h3 className="font-bold text-white text-lg flex items-center gap-2">
                  <FiMessageCircle size={20} className="text-orange-500" />
                  Let's Talk
                </h3>
                <p className="text-xs text-gray-400 mt-1">ADVMEN AI Support</p>
              </div>
              <button
                onClick={() => setIsChatOpen(false)}
                className="text-white hover:text-orange-500 transition-colors"
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
                    className={`max-w-xs px-3 py-2 rounded-lg text-sm leading-relaxed whitespace-pre-wrap ${
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
                className="flex-1 bg-gray-800 border border-orange-500/20 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 transition-colors"
              />
              <button
                onClick={handleSendMessage}
                disabled={isLoading || !input.trim()}
                className="p-2 rounded-lg bg-orange-500 text-white hover:bg-orange-600 disabled:opacity-50 transition-colors"
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
