import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiShoppingCart, FiX, FiPlus, FiMinus, FiCheck } from 'react-icons/fi'
// removed static imports
import { API_BASE_URL, getImageUrl } from '@utils/constants'
import './Catalog.css'

const Catalog = () => {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [cart, setCart] = useState([])
  const [showCart, setShowCart] = useState(false)
  const [showCheckoutModal, setShowCheckoutModal] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [checkoutForm, setCheckoutForm] = useState({
    clientName: '',
    clientEmail: '',
    clientPhone: '',
    clientCompany: '',
    requirements: ''
  })
  const [items, setItems] = useState([])
  const [categoriesList, setCategoriesList] = useState(['All'])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCatalog = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/catalog`)
        if (response.ok) {
          const data = await response.json()
          if (Array.isArray(data)) {
            const formattedData = data.map(item => ({ ...item, id: item._id || item.id }))
            setItems(formattedData)
            const uniqueCats = ['All', ...new Set(formattedData.map(item => item.category))]
            setCategoriesList(uniqueCats)
          }
        }
      } catch (err) {
        console.warn('Backend catalog API offline, falling back to static local data:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchCatalog()
  }, [])

  const filteredItems = selectedCategory === 'All'
    ? items
    : items.filter(item => item.category === selectedCategory)

  const addToCart = (item) => {
    setCart(prev => {
      const existing = prev.find(c => c.id === item.id)
      if (existing) {
        return prev.map(c => c.id === item.id ? { ...c, quantity: c.quantity + 1 } : c)
      }
      return [...prev, { ...item, quantity: 1 }]
    })
  }

  const removeFromCart = (itemId) => setCart(prev => prev.filter(item => item.id !== itemId))

  const updateQuantity = (itemId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(itemId)
    } else {
      setCart(prev => prev.map(item => item.id === itemId ? { ...item, quantity } : item))
    }
  }

  const totalPrice = cart.reduce((sum, item) => sum + (item.price || 0) * item.quantity, 0)
  const cartCount  = cart.reduce((sum, item) => sum + item.quantity, 0)

  const handleCheckoutSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    const payload = {
      ...checkoutForm,
      items: cart.map(item => ({ catalogItemId: item.id, name: item.name, price: item.price, quantity: item.quantity })),
      totalAmount: totalPrice
    }

    try {
      const res = await fetch(`${API_BASE_URL}/api/catalog-orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })

      if (res.ok) {
        setCart([])
        setShowCheckoutModal(false)
        setShowCart(false)
        setCheckoutForm({ clientName: '', clientEmail: '', clientPhone: '', clientCompany: '', requirements: '' })
        alert('Your order has been submitted successfully! We will contact you soon.')
      } else {
        const data = await res.json()
        alert(data.message || 'Failed to submit order. Please try again.')
      }
    } catch (err) {
      console.error(err)
      alert('Network error. Please try again later.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="catalog-page">
      {/* Header */}
      <section className="catalog-header">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="header-content"
          >
            <h1>Our Catalog</h1>
            <p>Browse and purchase our services and products</p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="catalog-content">
        <div className="container">
          <div className="catalog-layout">
            {/* Sidebar - Categories */}
            <aside className="catalog-sidebar">
              <h3>Categories</h3>
              <div className="categories-list">
                {categoriesList.map((category) => (
                  <motion.button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
                    whileHover={{ x: 5 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {category}
                  </motion.button>
                ))}
              </div>
            </aside>

            {/* Main - Products Grid */}
            <main className="catalog-main">
              {loading ? (
                <div className="flex items-center justify-center py-24">
                  <div className="w-10 h-10 rounded-full border-4 border-dashed border-[var(--color-orange)] animate-spin" />
                </div>
              ) : filteredItems.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-24 gap-4 text-center">
                  <span className="text-5xl">📭</span>
                  <p className="font-body text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                    No items found in this category.
                  </p>
                </div>
              ) : (
                <div className="products-grid">
                  {filteredItems.map((item) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="product-card"
                    >
                      <div className="product-image">
                        <img src={item.image.startsWith('/') ? getImageUrl(item.image) : item.image} alt={item.name} loading="lazy" />
                        <span className="category-badge">{item.category}</span>
                      </div>
                      <div className="product-info">
                        <h4>{item.name}</h4>
                        <p className="description">{item.description}</p>
                        <ul className="features">
                          {Array.isArray(item.features) && item.features.slice(0, 2).map((feature, idx) => (
                            <li key={idx} className="flex items-center gap-1.5">
                              <FiCheck size={12} className="text-[var(--color-orange)] shrink-0" /> {feature}
                            </li>
                          ))}
                        </ul>
                        <div className="product-footer">
                          <span className="price">₹{(item.price || 0).toLocaleString()}</span>
                          <motion.button
                            onClick={() => addToCart(item)}
                            className="add-btn"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <FiShoppingCart size={18} />
                            Add
                          </motion.button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </main>
          </div>
        </div>
      </section>

      {/* Cart FAB — hidden when cart is open */}
      <AnimatePresence>
        {!showCart && (
          <motion.button
            className="cart-fab"
            onClick={() => setShowCart(true)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
          >
            <FiShoppingCart size={24} />
            {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
          </motion.button>
        )}
      </AnimatePresence>

      {/* Cart Sidebar with proper AnimatePresence */}
      <AnimatePresence>
        {showCart && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowCart(false)}
            />
            <motion.div
              initial={{ x: 400 }}
              animate={{ x: 0 }}
              exit={{ x: 400 }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className="cart-sidebar"
              style={{ zIndex: 45 }}
            >
              <div className="cart-header">
                <h3>Shopping Cart</h3>
                <button onClick={() => setShowCart(false)} className="close-btn">
                  <FiX size={24} />
                </button>
              </div>

              <div className="cart-items">
                {cart.length === 0 ? (
                  <p className="empty-cart">Your cart is empty</p>
                ) : (
                  cart.map((item) => (
                    <div key={item.id} className="cart-item">
                      <div className="item-info">
                        <h5>{item.name}</h5>
                        <p>₹{(item.price || 0).toLocaleString()}</p>
                      </div>
                      <div className="item-controls">
                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                          <FiMinus size={16} />
                        </button>
                        <span>{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                          <FiPlus size={16} />
                        </button>
                      </div>
                      <button onClick={() => removeFromCart(item.id)} className="remove-btn">
                        <FiX size={16} />
                      </button>
                    </div>
                  ))
                )}
              </div>

              {cart.length > 0 && (
                <div className="cart-footer">
                  <div className="total">
                    <span>Total:</span>
                    <span className="amount">₹{totalPrice.toLocaleString()}</span>
                  </div>
                  <motion.button
                    className="checkout-btn"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setShowCheckoutModal(true)}
                  >
                    Proceed to Checkout
                  </motion.button>
                  <motion.button
                    className="close-cart-btn"
                    onClick={() => setShowCart(false)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Close Cart
                  </motion.button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Checkout Modal */}
      <AnimatePresence>
        {showCheckoutModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowCheckoutModal(false)}
            />
            <motion.div
              className="relative bg-[var(--color-surface-1)] w-full max-w-lg rounded-2xl p-6 md:p-8 border border-[rgba(255,255,255,0.05)] shadow-2xl"
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
            >
              <button 
                onClick={() => setShowCheckoutModal(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
              >
                <FiX size={24} />
              </button>
              
              <h2 className="text-2xl font-bold font-display mb-6 text-white">Complete Your Booking</h2>
              
              <form onSubmit={handleCheckoutSubmit} className="flex flex-col gap-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs uppercase tracking-wider text-gray-400 font-bold">Name *</label>
                    <input 
                      type="text" required
                      value={checkoutForm.clientName}
                      onChange={e => setCheckoutForm({...checkoutForm, clientName: e.target.value})}
                      className="bg-[var(--color-black)] border border-[rgba(255,255,255,0.1)] rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[var(--color-orange)]"
                      placeholder="John Doe"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs uppercase tracking-wider text-gray-400 font-bold">Email *</label>
                    <input 
                      type="email" required
                      value={checkoutForm.clientEmail}
                      onChange={e => setCheckoutForm({...checkoutForm, clientEmail: e.target.value})}
                      className="bg-[var(--color-black)] border border-[rgba(255,255,255,0.1)] rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[var(--color-orange)]"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs uppercase tracking-wider text-gray-400 font-bold">Phone *</label>
                    <input 
                      type="tel" required
                      value={checkoutForm.clientPhone}
                      onChange={e => setCheckoutForm({...checkoutForm, clientPhone: e.target.value})}
                      className="bg-[var(--color-black)] border border-[rgba(255,255,255,0.1)] rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[var(--color-orange)]"
                      placeholder="+91 9876543210"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs uppercase tracking-wider text-gray-400 font-bold">Company (Optional)</label>
                    <input 
                      type="text"
                      value={checkoutForm.clientCompany}
                      onChange={e => setCheckoutForm({...checkoutForm, clientCompany: e.target.value})}
                      className="bg-[var(--color-black)] border border-[rgba(255,255,255,0.1)] rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[var(--color-orange)]"
                      placeholder="Your Company"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs uppercase tracking-wider text-gray-400 font-bold">Project Requirements *</label>
                  <textarea 
                    required rows={3}
                    value={checkoutForm.requirements}
                    onChange={e => setCheckoutForm({...checkoutForm, requirements: e.target.value})}
                    className="bg-[var(--color-black)] border border-[rgba(255,255,255,0.1)] rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[var(--color-orange)] resize-none"
                    placeholder="Briefly describe your project needs..."
                  />
                </div>

                <div className="flex justify-between items-center mt-4 pt-4 border-t border-[rgba(255,255,255,0.05)]">
                  <div className="text-gray-400 text-sm">Total Amount: <span className="text-white font-bold text-lg">₹{totalPrice.toLocaleString()}</span></div>
                  <button 
                    type="submit" disabled={isSubmitting}
                    className={`px-6 py-3 rounded-lg font-bold uppercase tracking-wider text-xs transition-colors flex items-center justify-center min-w-[140px] ${isSubmitting ? 'bg-[var(--color-orange)]/70 text-white cursor-not-allowed' : 'bg-[var(--color-orange)] hover:bg-[#e65c00] text-white cursor-pointer'}`}
                  >
                    {isSubmitting ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full border-2 border-t-transparent border-white animate-spin" />
                        <span>Submitting...</span>
                      </div>
                    ) : (
                      'Submit Order'
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Catalog
