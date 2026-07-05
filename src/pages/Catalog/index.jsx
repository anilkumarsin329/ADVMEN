import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiShoppingCart, FiX, FiPlus, FiMinus } from 'react-icons/fi'
import { catalogItems, categories } from '@data/catalog'
import './Catalog.css'

const Catalog = () => {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [cart, setCart] = useState([])
  const [showCart, setShowCart] = useState(false)

  // Derived state for filtering products
  const filteredItems = selectedCategory === 'All'
    ? catalogItems
    : catalogItems.filter(item => item.category === selectedCategory)

  const addToCart = (item) => {
    const existingItem = cart.find(cartItem => cartItem.id === item.id)
    if (existingItem) {
      setCart(cart.map(cartItem =>
        cartItem.id === item.id
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      ))
    } else {
      setCart([...cart, { ...item, quantity: 1 }])
    }
  }

  const removeFromCart = (itemId) => {
    setCart(cart.filter(item => item.id !== itemId))
  }

  const updateQuantity = (itemId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(itemId)
    } else {
      setCart(cart.map(item =>
        item.id === itemId ? { ...item, quantity } : item
      ))
    }
  }

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

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
                {categories.map((category) => (
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
              <div className="products-grid">
                {filteredItems.map((item) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="product-card"
                  >
                    <div className="product-image">
                      <img src={item.image} alt={item.name} />
                      <span className="category-badge">{item.category}</span>
                    </div>
                    <div className="product-info">
                      <h4>{item.name}</h4>
                      <p className="description">{item.description}</p>
                      <ul className="features">
                        {item.features.slice(0, 2).map((feature, idx) => (
                          <li key={idx}>✓ {feature}</li>
                        ))}
                      </ul>
                      <div className="product-footer">
                        <span className="price">₹{item.price.toLocaleString()}</span>
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
            </main>
          </div>
        </div>
      </section>

      {/* Cart Button */}
      <motion.button
        className="cart-fab"
        onClick={() => setShowCart(!showCart)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <FiShoppingCart size={24} />
        {cart.length > 0 && <span className="cart-count">{cart.length}</span>}
      </motion.button>

      {/* Cart Sidebar */}
      {showCart && (
        <motion.div
          initial={{ x: 400 }}
          animate={{ x: 0 }}
          exit={{ x: 400 }}
          className="cart-sidebar"
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
                    <p>₹{item.price.toLocaleString()}</p>
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
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="remove-btn"
                  >
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
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Proceed to Checkout
              </motion.button>
              <motion.button
                className="close-cart-btn"
                onClick={() => setShowCart(false)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Close Cart
              </motion.button>
            </div>
          )}
        </motion.div>
      )}
    </div>
  )
}

export default Catalog
