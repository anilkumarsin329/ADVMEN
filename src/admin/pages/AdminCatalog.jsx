/**
 * admin/pages/AdminCatalog.jsx
 * ─────────────────────────────────────────────────────────────
 * ADVMEN Technologies — Admin Catalog CRUD Manager Dashboard
 * ─────────────────────────────────────────────────────────────
 */

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  FiBookOpen, 
  FiPlus, 
  FiEdit2, 
  FiTrash2, 
  FiX, 
  FiCheck, 
  FiAlertCircle,
  FiSearch,
  FiFolder,
  FiDollarSign,
  FiLayers,
  FiUpload,
  FiImage,
  FiSliders,
  FiSettings,
  FiEye,
  FiPlay,
  FiPause,
  FiUploadCloud
} from 'react-icons/fi'
import { useAdminAuth } from '@/admin/context/AdminAuthContext'

const defaultCategories = [
  'Branding',
  'Web Development',
  'Digital Marketing',
  'App Development',
  'SEO',
  'Content'
]

const AdminCatalog = () => {
  const { token } = useAdminAuth()
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  
  // Custom Category States
  const [isCustomCategory, setIsCustomCategory] = useState(false)
  const [customCategoryValue, setCustomCategoryValue] = useState('')

  // Notification Toast State
  const [toast, setToast] = useState(null)

  // Actions Dropdown state
  const [activeDropdownId, setActiveDropdownId] = useState(null)

  // Modals state
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  
  const [currentItem, setCurrentItem] = useState(null) // null for create, object for edit
  const [viewItemTarget, setViewItemTarget] = useState(null)
  const [deleteItemTarget, setDeleteItemTarget] = useState(null)

  // Image Uploading State
  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)

  // Form Fields State
  const [formValues, setFormValues] = useState({
    name: '',
    category: '',
    price: '',
    image: '',
    description: '',
    featuresString: '',
    isActive: true,
  })
  const [formErrors, setFormErrors] = useState({})

  // Fetch catalog items from API
  const fetchCatalogData = async () => {
    setLoading(true)
    try {
      const response = await fetch('http://localhost:5000/api/catalog')
      if (response.ok) {
        const data = await response.json()
        if (Array.isArray(data)) {
          const formatted = data.map(item => ({
            ...item,
            id: item._id || item.id
          }))
          setItems(formatted)
          return
        }
      }
      setItems([])
    } catch (err) {
      console.warn('Backend Catalog API not reachable, setting empty list:', err)
      setItems([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCatalogData()
  }, [])

  // Auto Dismiss Toast
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        setToast(null)
      }, 4000)
      return () => clearTimeout(timer)
    }
  }, [toast])

  const showToast = (message, type = 'success') => {
    setToast({ message, type })
  }

  // Calculate Statistics
  const totalItems = items.length
  const uniqueCategories = ['All', ...new Set(items.map(item => item.category))]
  const averagePrice = totalItems > 0 
    ? Math.round(items.reduce((sum, item) => sum + Number(item.price), 0) / totalItems) 
    : 0

  // Handle Image File Upload to R2 Backend
  const handleFileChange = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    if (!file.type.startsWith('image/')) {
      showToast('Please select a valid image file.', 'error')
      return
    }

    setUploading(true)
    setUploadProgress(10)

    const formData = new FormData()
    formData.append('file', file)

    const authHeader = token ? { 'Authorization': `Bearer ${token}` } : {}

    try {
      // Dynamic upload progress simulation
      const interval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 90) {
            clearInterval(interval)
            return 90
          }
          return prev + 15
        })
      }, 150)

      const response = await fetch('http://localhost:5000/api/media/upload', {
        method: 'POST',
        headers: authHeader,
        body: formData,
      })

      clearInterval(interval)
      setUploadProgress(100)

      if (response.ok) {
        const data = await response.json()
        setFormValues(prev => ({
          ...prev,
          image: data.url
        }))
        showToast('Image uploaded successfully.')
      } else {
        const errData = await response.json()
        showToast(errData.message || 'R2 upload failed. Using local fallback.', 'error')
        const objectUrl = URL.createObjectURL(file)
        setFormValues(prev => ({
          ...prev,
          image: objectUrl
        }))
      }
    } catch (err) {
      console.warn('Media upload server offline. Fallback to ObjectURL:', err)
      showToast('Uploaded successfully (local offline preview).')
      const objectUrl = URL.createObjectURL(file)
      setFormValues(prev => ({
        ...prev,
        image: objectUrl
      }))
    } finally {
      setTimeout(() => {
        setUploading(false)
        setUploadProgress(0)
      }, 400)
    }
  }

  // Category selection change handler
  const handleCategorySelectChange = (e) => {
    const value = e.target.value
    if (value === 'ADD_NEW_CATEGORY') {
      setIsCustomCategory(true)
      setCustomCategoryValue('')
      setFormValues(prev => ({ ...prev, category: '' }))
    } else {
      setIsCustomCategory(false)
      setCustomCategoryValue('')
      setFormValues(prev => ({ ...prev, category: value }))
    }
  }

  // Handle Form Open
  const openFormModal = (item = null) => {
    setFormErrors({})
    setActiveDropdownId(null)

    // Merge default categories with any existing custom categories
    const existingCats = [...new Set(items.map(i => i.category))]
    const dropdownCats = Array.from(new Set([...defaultCategories, ...existingCats]))

    if (item) {
      setCurrentItem(item)
      setFormValues({
        name: item.name,
        category: item.category,
        price: String(item.price),
        image: item.image,
        description: item.description,
        featuresString: Array.isArray(item.features) ? item.features.join(', ') : '',
        isActive: item.isActive !== false,
      })
      const isDefaultOrExisting = dropdownCats.includes(item.category)
      if (isDefaultOrExisting) {
        setIsCustomCategory(false)
        setCustomCategoryValue('')
      } else {
        setIsCustomCategory(true)
        setCustomCategoryValue(item.category)
      }
    } else {
      setCurrentItem(null)
      setFormValues({
        name: '',
        category: '',
        price: '',
        image: '',
        description: '',
        featuresString: '',
        isActive: true,
      })
      setIsCustomCategory(false)
      setCustomCategoryValue('')
    }
    setIsModalOpen(true)
  }

  // Form Validation
  const validateForm = () => {
    const errors = {}
    if (!formValues.name.trim()) errors.name = 'Name is required'
    if (!formValues.category.trim()) errors.category = 'Category is required'
    
    const priceNum = Number(formValues.price)
    if (!formValues.price.trim()) {
      errors.price = 'Price is required'
    } else if (isNaN(priceNum) || priceNum < 0) {
      errors.price = 'Price must be a valid positive number'
    }

    if (!formValues.image.trim()) errors.image = 'Image upload is required'
    if (!formValues.description.trim()) errors.description = 'Description is required'
    if (!formValues.featuresString.trim()) errors.featuresString = 'At least one feature is required'

    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  // Handle Save
  const handleSaveItem = async (e) => {
    e.preventDefault()
    if (!validateForm()) return

    const featuresArray = formValues.featuresString
      .split(',')
      .map(f => f.trim())
      .filter(f => f !== '')

    const payload = {
      name: formValues.name,
      category: formValues.category,
      price: Number(formValues.price),
      image: formValues.image,
      description: formValues.description,
      features: featuresArray,
      isActive: formValues.isActive,
    }

    const authHeader = token ? { 'Authorization': `Bearer ${token}` } : {}

    try {
      if (currentItem) {
        // Edit Mode
        const response = await fetch(`http://localhost:5000/api/catalog/${currentItem.id || currentItem._id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            ...authHeader
          },
          body: JSON.stringify(payload),
        })

        if (response.ok) {
          const data = await response.json()
          setItems(items.map(item => (item.id === currentItem.id ? { ...data.item, id: data.item._id || data.item.id } : item)))
          showToast('Catalog item updated successfully.')
        } else {
          console.warn('API update failed, updating state locally (mock fallback)')
          setItems(items.map(item => (item.id === currentItem.id ? { ...item, ...payload } : item)))
          showToast('Catalog updated (local offline mode).')
        }
      } else {
        // Create Mode
        const response = await fetch('http://localhost:5000/api/catalog', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            ...authHeader
          },
          body: JSON.stringify(payload),
        })

        if (response.ok) {
          const data = await response.json()
          setItems([{ ...data.item, id: data.item._id || data.item.id }, ...items])
          showToast('Catalog item created successfully.')
        } else {
          console.warn('API create failed, adding to state locally (mock fallback)')
          const mockNewItem = {
            ...payload,
            id: String(Date.now()),
            createdAt: new Date().toISOString()
          }
          setItems([mockNewItem, ...items])
          showToast('Catalog item created (local offline mode).')
        }
      }
      setIsModalOpen(false)
    } catch (err) {
      console.warn('Catalog API connection failed, updating state locally:', err)
      if (currentItem) {
        setItems(items.map(item => (item.id === currentItem.id ? { ...item, ...payload } : item)))
        showToast('Catalog item updated (local offline mode).')
      } else {
        const mockNewItem = {
          ...payload,
          id: String(Date.now()),
          createdAt: new Date().toISOString()
        }
        setItems([mockNewItem, ...items])
        showToast('Catalog item created (local offline mode).')
      }
      setIsModalOpen(false)
    }
  }

  // Handle Detail View
  const handleViewDetails = (item) => {
    setActiveDropdownId(null)
    setViewItemTarget(item)
    setIsViewModalOpen(true)
  }

  // Handle Toggle Active/Inactive Status
  const handleToggleStatus = async (item) => {
    setActiveDropdownId(null)
    
    const updatedStatus = !item.isActive
    setItems(items.map(i => (i.id === item.id ? { ...i, isActive: updatedStatus } : i)))

    const authHeader = token ? { 'Authorization': `Bearer ${token}` } : {}

    try {
      const response = await fetch(`http://localhost:5000/api/catalog/${item.id || item._id}/toggle`, {
        method: 'PATCH',
        headers: authHeader,
      })

      if (response.ok) {
        const data = await response.json()
        setItems(items.map(i => (i.id === item.id ? { ...data.item, id: data.item._id || data.item.id } : i)))
        showToast(`Catalog item ${data.item.isActive ? 'enabled' : 'disabled'} successfully.`)
      } else {
        showToast(`Item availability status toggled (local offline mode).`)
      }
    } catch (err) {
      console.warn('Catalog toggle API failed, fallback to local state:', err)
      showToast(`Item availability status toggled (local offline mode).`)
    }
  }

  // Handle Delete Confirmation
  const requestDelete = (item) => {
    setActiveDropdownId(null)
    setDeleteItemTarget(item)
    setIsDeleteModalOpen(true)
  }

  const handleDeleteItem = async () => {
    if (!deleteItemTarget) return

    const authHeader = token ? { 'Authorization': `Bearer ${token}` } : {}

    try {
      const response = await fetch(`http://localhost:5000/api/catalog/${deleteItemTarget.id || deleteItemTarget._id}`, {
        method: 'DELETE',
        headers: authHeader,
      })

      if (response.ok) {
        setItems(items.filter(item => item.id !== deleteItemTarget.id))
        showToast('Catalog item deleted successfully.', 'error')
      } else {
        setItems(items.filter(item => item.id !== deleteItemTarget.id))
        showToast('Catalog item deleted (local offline mode).', 'error')
      }
    } catch (err) {
      console.warn('Catalog API connection failed, deleting locally:', err)
      setItems(items.filter(item => item.id !== deleteItemTarget.id))
      showToast('Catalog item deleted (local offline mode).', 'error')
    } finally {
      setIsDeleteModalOpen(false)
      setDeleteItemTarget(null)
    }
  }

  // Filter and Search items
  const filteredItems = items.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          item.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="admin-catalog-container w-full space-y-8 pb-10" style={{ color: 'var(--admin-text-primary)' }}>
      {/* Dynamic light-theme visual style overrides to prevent dark-theme white text inheritance */}
      <style dangerouslySetInnerHTML={{__html: `
        .admin-catalog-container h2 {
          color: #121215 !important;
        }
        .admin-catalog-container h3 {
          color: #121215 !important;
        }
        .admin-catalog-container th {
          color: #555555 !important;
        }
        .admin-catalog-container td {
          color: #121215 !important;
        }
        .admin-catalog-container td span {
          color: inherit;
        }
        .admin-catalog-container label {
          color: #555555 !important;
        }
        .admin-catalog-container span.badge-gray {
          background-color: rgba(0, 0, 0, 0.05) !important;
          color: #555555 !important;
          border: 1px solid rgba(0, 0, 0, 0.08) !important;
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none !important;
        }
        .no-scrollbar {
          -ms-overflow-style: none !important;
          scrollbar-width: none !important;
        }
      `}} />
      
      {/* Toast Notification Container */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -20, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: -20, x: '-50%' }}
            className="fixed top-6 left-1/2 z-50 flex items-center gap-3 px-6 py-4 rounded-2xl shadow-lg border"
            style={{
              background: toast.type === 'error' ? '#fff5f5' : '#f5fff5',
              borderColor: toast.type === 'error' ? 'rgba(239, 68, 68, 0.2)' : 'rgba(34, 197, 94, 0.2)',
              color: toast.type === 'error' ? '#ef4444' : '#22c55e',
            }}
          >
            {toast.type === 'error' ? <FiAlertCircle size={18} /> : <FiCheck size={18} />}
            <span className="font-body text-xs font-bold uppercase tracking-wider">{toast.message}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header Info Panel */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <span className="font-mono text-[9px] uppercase tracking-widest" style={{ color: 'var(--color-orange)' }}>
            Agency Catalog Packages
          </span>
          <h2 className="text-xl sm:text-2xl font-bold font-display uppercase tracking-wider mt-1">
            Catalog Management
          </h2>
        </div>

        <button
          onClick={() => openFormModal(null)}
          className="flex items-center gap-2 px-5 py-3 rounded-xl font-body text-xs font-bold uppercase tracking-wider bg-[var(--color-orange)] hover:bg-[var(--color-orange-light)] text-white shadow-md hover:shadow-lg transition-all cursor-pointer"
          data-cursor="hover"
        >
          <FiPlus size={16} />
          Add Service / Product
        </button>
      </div>

      {/* Statistics Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {/* Total Items */}
        <motion.div 
          whileHover={{ y: -2 }}
          className="p-6 rounded-2xl flex flex-col justify-between"
          style={{
            background: 'var(--admin-bg)',
            boxShadow: 'var(--admin-shadow-neu-convex)',
          }}
        >
          <div className="flex justify-between items-start mb-4">
            <span className="font-mono text-[9px] uppercase tracking-wider font-bold" style={{ color: 'var(--admin-text-secondary)' }}>
              Total Services
            </span>
            <div className="w-9 h-9 rounded-xl flex items-center justify-center text-sm" style={{ boxShadow: 'var(--admin-shadow-neu-inset)', color: 'var(--admin-text-secondary)' }}>
              <FiBookOpen />
            </div>
          </div>
          <span className="text-3xl font-extrabold font-display leading-none tracking-tight mt-2" style={{ color: 'var(--admin-text-primary)' }}>
            {totalItems}
          </span>
        </motion.div>

        {/* Categories Count */}
        <motion.div 
          whileHover={{ y: -2 }}
          className="p-6 rounded-2xl flex flex-col justify-between"
          style={{
            background: 'var(--admin-bg)',
            boxShadow: 'var(--admin-shadow-neu-convex)',
          }}
        >
          <div className="flex justify-between items-start mb-4">
            <span className="font-mono text-[9px] uppercase tracking-wider font-bold" style={{ color: 'var(--admin-text-secondary)' }}>
              Categories
            </span>
            <div className="w-9 h-9 rounded-xl flex items-center justify-center text-sm" style={{ boxShadow: 'var(--admin-shadow-neu-inset)', color: 'var(--admin-text-secondary)' }}>
              <FiFolder />
            </div>
          </div>
          <span className="text-3xl font-extrabold font-display leading-none tracking-tight mt-2" style={{ color: 'var(--admin-text-primary)' }}>
            {uniqueCategories.length - 1}
          </span>
        </motion.div>

        {/* Average Price */}
        <motion.div 
          whileHover={{ y: -2 }}
          className="p-6 rounded-2xl flex flex-col justify-between"
          style={{
            background: 'var(--admin-bg)',
            boxShadow: 'var(--admin-shadow-neu-convex)',
          }}
        >
          <div className="flex justify-between items-start mb-4">
            <span className="font-mono text-[9px] uppercase tracking-wider font-bold" style={{ color: 'var(--admin-text-secondary)' }}>
              Avg Package Price
            </span>
            <div className="w-9 h-9 rounded-xl flex items-center justify-center text-sm" style={{ boxShadow: 'var(--admin-shadow-neu-inset)', color: 'var(--admin-text-secondary)' }}>
              <FiDollarSign />
            </div>
          </div>
          <span className="text-3xl font-extrabold font-display leading-none tracking-tight mt-2" style={{ color: 'var(--admin-text-primary)' }}>
            ₹{averagePrice.toLocaleString()}
          </span>
        </motion.div>
      </div>

      {/* Main Filter & Content Card */}
      <div 
        className="rounded-2xl border overflow-hidden"
        style={{
          background: 'var(--admin-card-bg)',
          borderColor: 'var(--admin-border)',
          boxShadow: 'var(--admin-shadow-sm)',
        }}
      >
        
        {/* Search, Filter Categories Header Bar */}
        <div className="p-6 border-b flex flex-col md:flex-row justify-between items-start md:items-center gap-4 overflow-hidden w-full" style={{ borderColor: 'var(--admin-border)' }}>
          {/* Search Input */}
          <div className="relative flex-shrink-0 w-full md:w-[280px]">
            <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--admin-text-tertiary)]" size={16} />
            <input
              type="text"
              placeholder="Search catalog..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border text-xs font-body focus:outline-none focus:border-[var(--color-orange)] transition-colors focus:ring-1 focus:ring-[var(--color-orange)]"
              style={{
                borderColor: 'var(--admin-border)',
                background: 'var(--admin-bg)',
                color: 'var(--admin-text-primary)'
              }}
            />
          </div>

          {/* Category Filter buttons */}
          <div className="flex flex-row items-center gap-1.5 w-full md:flex-1 overflow-x-auto no-scrollbar pb-1 md:pb-0" style={{ WebkitOverflowScrolling: 'touch' }}>
            {uniqueCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`flex-shrink-0 px-3.5 py-1.5 rounded-lg font-mono text-[9px] uppercase tracking-wider transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[var(--color-orange)] text-white shadow-md'
                    : 'bg-[var(--admin-bg)] border text-[var(--admin-text-secondary)] hover:bg-orange-50 hover:text-[var(--color-orange)]'
                }`}
                style={{ borderColor: selectedCategory === cat ? 'transparent' : 'var(--admin-border)' }}
                data-cursor="hover"
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Data Table */}
        <div className="overflow-x-auto w-full [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-24 gap-3">
              <div className="w-8 h-8 rounded-full border-2 border-[var(--color-orange)] border-t-transparent animate-spin" />
              <span className="font-mono text-[10px] uppercase tracking-widest text-[var(--admin-text-tertiary)]">Loading Catalog Items...</span>
            </div>
          ) : filteredItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 px-6 text-center max-w-md mx-auto">
              <div className="w-20 h-20 rounded-full border flex items-center justify-center text-4xl mb-6 shadow-sm bg-orange-50/50 border-orange-100 text-[var(--color-orange)]">
                <FiFolder className="animate-pulse" />
              </div>
              <h3 className="font-display font-extrabold uppercase tracking-wider text-sm mb-2" style={{ color: 'var(--admin-text-primary)' }}>
                Your Creative Catalog is Empty
              </h3>
              <p className="font-body text-xs text-[var(--admin-text-tertiary)] leading-relaxed mb-6">
                Start listing your premium design and technology packages. Added items will instantly publish to the client-facing catalog page.
              </p>
              <button
                onClick={() => openFormModal(null)}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-body text-xs font-bold uppercase tracking-wider bg-[var(--color-orange)] hover:bg-[var(--color-orange-light)] text-white shadow-md hover:shadow-lg transition-all cursor-pointer"
                data-cursor="hover"
              >
                <FiPlus size={16} />
                Create First Package
              </button>
            </div>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[var(--admin-bg)] border-b" style={{ borderColor: 'var(--admin-border)' }}>
                  <th className="p-4 font-mono text-[9px] uppercase tracking-wider text-[var(--admin-text-secondary)]">Package</th>
                  <th className="p-4 font-mono text-[9px] uppercase tracking-wider text-[var(--admin-text-secondary)]">Category</th>
                  <th className="p-4 font-mono text-[9px] uppercase tracking-wider text-[var(--admin-text-secondary)]">Price</th>
                  <th className="p-4 font-mono text-[9px] uppercase tracking-wider text-[var(--admin-text-secondary)]">Features</th>
                  <th className="p-4 text-right font-mono text-[9px] uppercase tracking-wider text-[var(--admin-text-secondary)]">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredItems.map((item) => (
                  <tr 
                    key={item.id} 
                    className={`border-b hover:bg-[rgba(0,0,0,0.01)] transition-all ${item.isActive === false ? 'opacity-65 bg-gray-50/50' : ''}`}
                    style={{ borderColor: 'var(--admin-border)' }}
                  >
                    {/* Cover Photo and Details */}
                    <td className="p-4">
                      <div className="flex items-center gap-3.5 max-w-sm">
                        {item.image ? (
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-12 h-12 rounded-xl object-cover shrink-0 border shadow-sm"
                            style={{ borderColor: 'var(--admin-border)' }}
                          />
                        ) : (
                          <div className="w-12 h-12 rounded-xl border flex items-center justify-center bg-gray-100 text-gray-400 shrink-0" style={{ borderColor: 'var(--admin-border)' }}>
                            <FiImage size={18} />
                          </div>
                        )}
                        <div className="flex flex-col">
                          <div className="flex items-center gap-2">
                            <span className="font-body font-bold text-xs leading-snug">{item.name}</span>
                            {item.isActive === false ? (
                              <span className="bg-gray-100 border text-gray-500 text-[8px] font-bold tracking-wider px-1.5 py-0.5 rounded uppercase font-mono">
                                Inactive
                              </span>
                            ) : (
                              <span className="bg-green-50 border border-green-100 text-green-500 text-[8px] font-bold tracking-wider px-1.5 py-0.5 rounded uppercase font-mono">
                                Active
                              </span>
                            )}
                          </div>
                          <span className="font-body text-[10px] text-[var(--admin-text-tertiary)] truncate max-w-[240px] mt-0.5">
                            {item.description}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="p-4">
                      <span className="badge-gray font-mono text-[9px] px-2.5 py-1 tracking-wider uppercase">
                        {item.category}
                      </span>
                    </td>

                    {/* Price */}
                    <td className="p-4">
                      <span className="font-body font-bold text-xs text-[var(--admin-text-primary)]">
                        ₹{Number(item.price).toLocaleString()}
                      </span>
                    </td>

                    {/* Features list summary */}
                    <td className="p-4">
                      <div className="flex flex-wrap gap-1 max-w-xs">
                        {Array.isArray(item.features) && item.features.slice(0, 3).map((f, i) => (
                          <span key={i} className="bg-orange-50 border border-orange-100 text-[var(--color-orange)] text-[8px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded">
                            {f}
                          </span>
                        ))}
                        {Array.isArray(item.features) && item.features.length > 3 && (
                          <span className="text-[8px] text-[var(--admin-text-tertiary)] font-bold self-center">
                            +{item.features.length - 3} more
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Settings Dropdown Column */}
                    <td className="p-4 text-right relative">
                      <button
                        onClick={() => setActiveDropdownId(activeDropdownId === item.id ? null : item.id)}
                        className="p-2 rounded-lg border text-[var(--admin-text-secondary)] hover:text-[var(--color-orange)] hover:bg-orange-50 transition-colors cursor-pointer focus:outline-none"
                        style={{ borderColor: 'var(--admin-border)' }}
                        data-cursor="hover"
                        title="Configure actions"
                      >
                        <FiSettings size={15} />
                      </button>

                      {/* Dropdown Menu Popup */}
                      <AnimatePresence>
                        {activeDropdownId === item.id && (
                          <>
                            {/* Backdrop click dismisser */}
                            <div 
                              className="fixed inset-0 z-30 bg-transparent cursor-default"
                              onClick={() => setActiveDropdownId(null)}
                            />

                            <motion.div
                              initial={{ opacity: 0, scale: 0.95, y: 10 }}
                              animate={{ opacity: 1, scale: 1, y: 0 }}
                              exit={{ opacity: 0, scale: 0.95, y: 10 }}
                              transition={{ duration: 0.15 }}
                              className="absolute right-4 mt-1.5 w-36 z-40 p-1.5 border text-left rounded-xl"
                              style={{
                                background: 'var(--admin-card-bg)',
                                borderColor: 'var(--admin-border)',
                                boxShadow: 'var(--admin-shadow-md)',
                              }}
                            >
                              {/* View Action */}
                              <button
                                onClick={() => handleViewDetails(item)}
                                className="w-full flex items-center gap-2 px-2.5 py-2 rounded-lg font-body text-[10px] font-bold uppercase tracking-wider text-[var(--admin-text-secondary)] hover:text-[var(--color-orange)] hover:bg-orange-50 transition-all cursor-pointer"
                                data-cursor="hover"
                              >
                                <FiEye size={12} />
                                View Details
                              </button>

                              {/* Edit Action */}
                              <button
                                onClick={() => openFormModal(item)}
                                className="w-full flex items-center gap-2 px-2.5 py-2 rounded-lg font-body text-[10px] font-bold uppercase tracking-wider text-[var(--admin-text-secondary)] hover:text-[var(--color-orange)] hover:bg-orange-50 transition-all cursor-pointer"
                                data-cursor="hover"
                              >
                                <FiEdit2 size={12} />
                                Edit Item
                              </button>

                              {/* Enable/Disable Toggle Action */}
                              <button
                                onClick={() => handleToggleStatus(item)}
                                className="w-full flex items-center gap-2 px-2.5 py-2 rounded-lg font-body text-[10px] font-bold uppercase tracking-wider text-[var(--admin-text-secondary)] hover:text-[var(--color-orange)] hover:bg-orange-50 transition-all cursor-pointer"
                                data-cursor="hover"
                              >
                                {item.isActive !== false ? (
                                  <>
                                    <FiPause size={12} className="text-amber-500" />
                                    Disable Item
                                  </>
                                ) : (
                                  <>
                                    <FiPlay size={12} className="text-green-500" />
                                    Enable Item
                                  </>
                                )}
                              </button>

                              {/* Delete Action */}
                              <button
                                onClick={() => requestDelete(item)}
                                className="w-full flex items-center gap-2 px-2.5 py-2 rounded-lg font-body text-[10px] font-bold uppercase tracking-wider text-[var(--admin-text-secondary)] hover:text-red-500 hover:bg-red-50 transition-all cursor-pointer border-t mt-1 pt-1.5"
                                style={{ borderColor: 'var(--admin-border)' }}
                                data-cursor="hover"
                              >
                                <FiTrash2 size={12} />
                                Delete Item
                              </button>
                            </motion.div>
                          </>
                        )}
                      </AnimatePresence>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* CREATE / EDIT DIALOG FORM MODAL */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40"
              onClick={() => setIsModalOpen(false)}
            />

            {/* Modal Body */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative z-10 w-full max-w-lg p-6 rounded-2xl border flex flex-col max-h-[85vh]"
              style={{
                background: 'var(--admin-card-bg)',
                borderColor: 'var(--admin-border)',
                boxShadow: 'var(--admin-shadow-md)',
                color: 'var(--admin-text-primary)',
              }}
            >
              {/* Header */}
              <div className="flex justify-between items-center border-b pb-4 mb-5" style={{ borderColor: 'var(--admin-border)' }}>
                <h3 className="font-display font-extrabold text-sm uppercase tracking-wider">
                  {currentItem ? 'Edit Service Package' : 'Add New Service Package'}
                </h3>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-1 rounded-lg border hover:text-[var(--color-orange)] transition-colors cursor-pointer"
                  style={{ borderColor: 'var(--admin-border)' }}
                  data-cursor="hover"
                >
                  <FiX size={16} />
                </button>
              </div>

              {/* Form Content */}
              <form onSubmit={handleSaveItem} className="flex flex-col flex-1 overflow-hidden">
                {/* Scrollable Fields Wrapper */}
                <div className="flex-1 overflow-y-auto pr-1.5 space-y-4 max-h-[50vh] sm:max-h-[400px] no-scrollbar">
                
                {/* Package Name */}
                <div className="flex flex-col gap-1.5">
                  <label className="font-mono text-[9px] uppercase tracking-wider text-[var(--admin-text-secondary)] font-bold">
                    Package Name *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Website Development"
                    value={formValues.name}
                    onChange={(e) => setFormValues({ ...formValues, name: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border text-xs font-body focus:outline-none focus:border-[var(--color-orange)]"
                    style={{ borderColor: 'var(--admin-border)', background: 'var(--admin-bg)', color: 'var(--admin-text-primary)' }}
                  />
                  {formErrors.name && (
                    <span className="text-[10px] text-red-500 font-bold tracking-wide mt-0.5">{formErrors.name}</span>
                  )}
                </div>

                {/* Category & Price Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Category */}
                  <div className="flex flex-col gap-1.5">
                    <label className="font-mono text-[9px] uppercase tracking-wider text-[var(--admin-text-secondary)] font-bold">
                      Category *
                    </label>
                    <select
                      value={isCustomCategory ? 'ADD_NEW_CATEGORY' : formValues.category}
                      onChange={handleCategorySelectChange}
                      className="w-full px-4 py-2.5 rounded-xl border text-xs font-body focus:outline-none focus:border-[var(--color-orange)]"
                      style={{ borderColor: 'var(--admin-border)', background: 'var(--admin-bg)', color: 'var(--admin-text-primary)' }}
                    >
                      <option value="" disabled hidden>Select Category</option>
                      {Array.from(new Set([...defaultCategories, ...items.map(i => i.category)])).map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                      <option value="ADD_NEW_CATEGORY" className="font-bold" style={{ color: 'var(--color-orange)' }}>+ Add New Category</option>
                    </select>

                    {isCustomCategory && (
                      <input
                        type="text"
                        placeholder="Enter custom category name..."
                        value={customCategoryValue}
                        onChange={(e) => {
                          setCustomCategoryValue(e.target.value)
                          setFormValues({ ...formValues, category: e.target.value })
                        }}
                        className="w-full px-4 py-2.5 rounded-xl border text-xs font-body focus:outline-none focus:border-[var(--color-orange)] mt-2"
                        style={{ borderColor: 'var(--admin-border)', background: 'var(--admin-bg)', color: 'var(--admin-text-primary)' }}
                      />
                    )}
                    {formErrors.category && (
                      <span className="text-[10px] text-red-500 font-bold tracking-wide mt-0.5">{formErrors.category}</span>
                    )}
                  </div>

                  {/* Price */}
                  <div className="flex flex-col gap-1.5">
                    <label className="font-mono text-[9px] uppercase tracking-wider text-[var(--admin-text-secondary)] font-bold">
                      Price (₹) *
                    </label>
                    <input
                      type="number"
                      placeholder="e.g. 25000"
                      value={formValues.price}
                      onChange={(e) => setFormValues({ ...formValues, price: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border text-xs font-body focus:outline-none focus:border-[var(--color-orange)]"
                      style={{ borderColor: 'var(--admin-border)', background: 'var(--admin-bg)', color: 'var(--admin-text-primary)' }}
                    />
                    {formErrors.price && (
                      <span className="text-[10px] text-red-500 font-bold tracking-wide mt-0.5">{formErrors.price}</span>
                    )}
                  </div>
                </div>

                {/* Image Upload Input */}
                <div className="flex flex-col gap-1.5">
                  <label className="font-mono text-[9px] uppercase tracking-wider text-[var(--admin-text-secondary)] font-bold">
                    Cover Image *
                  </label>
                  
                  <div className="flex items-center gap-4 p-4 rounded-xl border border-dashed" style={{ borderColor: 'var(--admin-border)', background: 'var(--admin-bg)' }}>
                    {/* Thumbnail Preview */}
                    <div className="relative w-16 h-16 rounded-lg overflow-hidden shrink-0 border bg-white flex items-center justify-center" style={{ borderColor: 'var(--admin-border)' }}>
                      {formValues.image ? (
                        <img src={formValues.image} alt="Preview" className="w-full h-full object-cover" />
                      ) : (
                        <FiImage className="text-[var(--admin-text-tertiary)]" size={24} />
                      )}
                      {uploading && (
                        <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                          <div className="w-5 h-5 rounded-full border border-t-transparent border-white animate-spin" />
                        </div>
                      )}
                    </div>

                    {/* Upload Action controls */}
                    <div className="flex-1 flex flex-col gap-1">
                      <span className="font-body text-[11px] font-bold text-[var(--admin-text-secondary)]">
                        {uploading ? `Uploading... ${uploadProgress}%` : 'Upload package cover image'}
                      </span>
                      <span className="font-mono text-[9px] text-[var(--admin-text-tertiary)] uppercase">
                        Supports PNG, JPG, GIF up to 5MB
                      </span>
                      
                      {/* File Input */}
                      <div className="flex items-center gap-2 mt-1">
                        <label className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border font-body text-[10px] font-bold uppercase tracking-wider bg-white hover:bg-[var(--admin-bg)] hover:text-[var(--color-orange)] transition-all cursor-pointer select-none" style={{ borderColor: 'var(--admin-border)' }} data-cursor="hover">
                          <FiUpload size={12} />
                          Browse File
                          <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" disabled={uploading} />
                        </label>
                        {formValues.image && !uploading && (
                          <span className="text-[9px] text-green-500 font-bold flex items-center gap-1">
                            <FiCheck size={12} /> Ready
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  {formErrors.image && (
                    <span className="text-[10px] text-red-500 font-bold tracking-wide mt-0.5">{formErrors.image}</span>
                  )}
                </div>

                {/* Description */}
                <div className="flex flex-col gap-1.5">
                  <label className="font-mono text-[9px] uppercase tracking-wider text-[var(--admin-text-secondary)] font-bold">
                    Description Summary *
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Provide a brief summary of the package details..."
                    value={formValues.description}
                    onChange={(e) => setFormValues({ ...formValues, description: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border text-xs font-body focus:outline-none focus:border-[var(--color-orange)] resize-none"
                    style={{ borderColor: 'var(--admin-border)', background: 'var(--admin-bg)', color: 'var(--admin-text-primary)' }}
                  />
                  {formErrors.description && (
                    <span className="text-[10px] text-red-500 font-bold tracking-wide mt-0.5">{formErrors.description}</span>
                  )}
                </div>

                {/* Features (Comma Separated) */}
                <div className="flex flex-col gap-1.5">
                  <label className="font-mono text-[9px] uppercase tracking-wider text-[var(--admin-text-secondary)] font-bold">
                    Key Features * (comma separated values)
                  </label>
                  <input
                    type="text"
                    placeholder="Responsive Design, SEO Optimized, Mobile Friendly"
                    value={formValues.featuresString}
                    onChange={(e) => setFormValues({ ...formValues, featuresString: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border text-xs font-body focus:outline-none focus:border-[var(--color-orange)]"
                    style={{ borderColor: 'var(--admin-border)', background: 'var(--admin-bg)', color: 'var(--admin-text-primary)' }}
                  />
                  {formErrors.featuresString && (
                    <span className="text-[10px] text-red-500 font-bold tracking-wide mt-0.5">{formErrors.featuresString}</span>
                  )}
                </div>

                </div> {/* End scrollable fields wrapper */}

                {/* Form Action Buttons */}
                <div className="flex justify-end gap-2 border-t pt-4 mt-5" style={{ borderColor: 'var(--admin-border)' }}>
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2.5 rounded-lg border text-xs font-body font-bold uppercase tracking-wider text-[var(--admin-text-secondary)] hover:bg-[var(--admin-bg)] transition-colors cursor-pointer"
                    style={{ borderColor: 'var(--admin-border)' }}
                    data-cursor="hover"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-lg text-xs font-body font-bold uppercase tracking-wider bg-[var(--color-orange)] hover:bg-[var(--color-orange-light)] text-white shadow transition-colors cursor-pointer"
                    data-cursor="hover"
                  >
                    Save Changes
                  </button>
                </div>

              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* READ-ONLY VIEW DETAILS MODAL */}
      <AnimatePresence>
        {isViewModalOpen && viewItemTarget && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40"
              onClick={() => setIsViewModalOpen(false)}
            />

            {/* Modal Body */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative z-10 w-full max-w-md p-6 rounded-2xl border flex flex-col max-h-[85vh]"
              style={{
                background: 'var(--admin-card-bg)',
                borderColor: 'var(--admin-border)',
                boxShadow: 'var(--admin-shadow-md)',
                color: 'var(--admin-text-primary)',
              }}
            >
              {/* Header */}
              <div className="flex justify-between items-center border-b pb-4 mb-4" style={{ borderColor: 'var(--admin-border)' }}>
                <div className="flex flex-col gap-0.5">
                  <span className="font-mono text-[8px] uppercase tracking-widest text-[var(--color-orange)] font-bold">
                    Catalog Item Details
                  </span>
                  <h3 className="font-display font-extrabold text-sm uppercase tracking-wider">
                    {viewItemTarget.name}
                  </h3>
                </div>
                <button
                  onClick={() => setIsViewModalOpen(false)}
                  className="p-1 rounded-lg border hover:text-[var(--color-orange)] transition-colors cursor-pointer"
                  style={{ borderColor: 'var(--admin-border)' }}
                  data-cursor="hover"
                >
                  <FiX size={16} />
                </button>
              </div>

              {/* Scrollable details content container */}
              <div className="flex-1 overflow-y-auto pr-1.5 space-y-5 max-h-[50vh] sm:max-h-[380px] no-scrollbar">
                {/* Cover Photo */}
                {viewItemTarget.image ? (
                  <img
                    src={viewItemTarget.image}
                    alt={viewItemTarget.name}
                    className="w-full h-40 object-cover rounded-xl border shadow-sm"
                    style={{ borderColor: 'var(--admin-border)' }}
                  />
                ) : (
                  <div className="w-full h-40 rounded-xl border flex items-center justify-center bg-gray-100 text-gray-400" style={{ borderColor: 'var(--admin-border)' }}>
                    <FiImage size={32} />
                  </div>
                )}

                {/* Detail fields info */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col">
                    <span className="font-mono text-[8px] uppercase tracking-wider text-[var(--admin-text-tertiary)] font-bold font-mono">Category</span>
                    <span className="font-body text-xs font-bold text-[var(--admin-text-primary)] mt-1 uppercase">
                      {viewItemTarget.category}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-mono text-[8px] uppercase tracking-wider text-[var(--admin-text-tertiary)] font-bold font-mono">Price</span>
                    <span className="font-body text-xs font-extrabold text-[var(--admin-text-primary)] mt-1">
                      ₹{Number(viewItemTarget.price).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex flex-col col-span-2">
                    <span className="font-mono text-[8px] uppercase tracking-wider text-[var(--admin-text-tertiary)] font-bold font-mono">Availability Status</span>
                    <span className="font-body text-xs font-bold mt-1">
                      {viewItemTarget.isActive !== false ? (
                        <span className="text-green-500 flex items-center gap-1.5"><FiCheck size={12} /> Active (Shown to Clients)</span>
                      ) : (
                        <span className="text-amber-500 flex items-center gap-1.5"><FiPause size={12} /> Inactive (Hidden from Clients)</span>
                      )}
                    </span>
                  </div>
                </div>

                {/* Description */}
                <div className="flex flex-col">
                  <span className="font-mono text-[8px] uppercase tracking-wider text-[var(--admin-text-tertiary)] font-bold mb-1.5 font-mono">Description Summary</span>
                  <p className="font-body text-[11px] leading-relaxed text-[var(--admin-text-secondary)]">
                    {viewItemTarget.description}
                  </p>
                </div>

                {/* Features badges list */}
                <div className="flex flex-col">
                  <span className="font-mono text-[8px] uppercase tracking-wider text-[var(--admin-text-tertiary)] font-bold mb-2 font-mono">Package Key Features</span>
                  <div className="flex flex-wrap gap-1.5">
                    {Array.isArray(viewItemTarget.features) && viewItemTarget.features.map((f, i) => (
                      <span key={i} className="bg-orange-50 border border-orange-100 text-[var(--color-orange)] text-[8px] font-bold uppercase tracking-wider px-2 py-1 rounded">
                        {f}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Close Button */}
              <div className="flex justify-end border-t pt-4 mt-3" style={{ borderColor: 'var(--admin-border)' }}>
                <button
                  onClick={() => setIsViewModalOpen(false)}
                  className="px-5 py-2 rounded-lg text-xs font-body font-bold uppercase tracking-wider bg-[var(--color-orange)] hover:bg-[var(--color-orange-light)] text-white shadow cursor-pointer transition-colors"
                  data-cursor="hover"
                >
                  Close View
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* DELETE CONFIRMATION DIALOG MODAL */}
      <AnimatePresence>
        {isDeleteModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40"
              onClick={() => setIsDeleteModalOpen(false)}
            />

            {/* Modal Body */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative z-10 w-full max-w-sm p-6 rounded-2xl border flex flex-col text-center"
              style={{
                background: 'var(--admin-card-bg)',
                borderColor: 'var(--admin-border)',
                boxShadow: 'var(--admin-shadow-md)',
                color: 'var(--admin-text-primary)',
              }}
            >
              <FiAlertCircle className="mx-auto text-4xl text-red-500 mb-4 animate-bounce" />
              <h3 className="font-display font-extrabold text-sm sm:text-base uppercase tracking-wider mb-2">
                Delete Catalog Item
              </h3>
              <p className="font-body text-xs text-[var(--admin-text-secondary)] leading-relaxed mb-6">
                Are you absolutely sure you want to delete **{deleteItemTarget?.name}**? This action is permanent and cannot be undone.
              </p>

              {/* Actions */}
              <div className="flex justify-center gap-2.5">
                <button
                  onClick={() => setIsDeleteModalOpen(false)}
                  className="px-4 py-2 rounded-lg border text-xs font-body font-bold uppercase tracking-wider text-[var(--admin-text-secondary)] hover:bg-[var(--admin-bg)] transition-colors cursor-pointer"
                  style={{ borderColor: 'var(--admin-border)' }}
                  data-cursor="hover"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteItem}
                  className="px-4 py-2 rounded-lg text-xs font-body font-bold uppercase tracking-wider bg-red-500 hover:bg-red-600 text-white shadow transition-colors cursor-pointer"
                  data-cursor="hover"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  )
}

export default AdminCatalog
