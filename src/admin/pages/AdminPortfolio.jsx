/**
 * admin/pages/AdminPortfolio.jsx
 * ─────────────────────────────────────────────────────────────
 * ADVMEN Technologies — Admin Portfolio Management (Industrial Light Theme)
 * ─────────────────────────────────────────────────────────────
 */

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  FiLayers, 
  FiPlus, 
  FiEdit2, 
  FiTrash2, 
  FiX, 
  FiCheck, 
  FiAlertCircle,
  FiSearch,
  FiUploadCloud,
  FiFolder,
  FiCheckCircle,
  FiClock,
  FiRefreshCw,
  FiSettings,
  FiEye,
  FiXCircle,
  FiExternalLink
} from 'react-icons/fi'
import { useAdminAuth } from '@/admin/context/AdminAuthContext'
import { API_BASE_URL, getImageUrl } from '@utils/constants'

const AdminPortfolio = () => {
  const { token } = useAdminAuth()
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')

  // Notification Toast State
  const [toast, setToast] = useState(null)

  // Dropdown state
  const [activeDropdownId, setActiveDropdownId] = useState(null)

  // Modals state
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)
  
  const [currentItem, setCurrentItem] = useState(null)
  const [deleteItemTarget, setDeleteItemTarget] = useState(null)
  const [viewItemTarget, setViewItemTarget] = useState(null)

  // Image Uploading State
  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)

  // Form Fields State
  const [formValues, setFormValues] = useState({
    title: '',
    slug: '',
    category: '',
    year: '',
    tagsString: '',
    description: '',
    tagline: '',
    challenge: '',
    solution: '',
    resultsString: '',
    techString: '',
    client: '',
    duration: '',
    image: '',
    projectLink: '',
    isActive: true,
  })
  const [formErrors, setFormErrors] = useState({})
  const [isSaving, setIsSaving] = useState(false)

  const fetchPortfolioData = async () => {
    setLoading(true)
    try {
      const response = await fetch(`${API_BASE_URL}/api/portfolio/all`, {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      if (response.ok) {
        const data = await response.json()
        if (Array.isArray(data)) {
          setItems(data.map(item => ({ ...item, id: item._id })))
        }
      } else {
        setItems([])
      }
    } catch (err) {
      console.warn('Backend API not reachable:', err)
      setItems([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPortfolioData()
  }, [])

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 4000)
      return () => clearTimeout(timer)
    }
  }, [toast])

  const showToast = (message, type = 'success') => setToast({ message, type })

  const uniqueCategories = ['All', ...new Set(items.map(item => item.category))]
  const totalItems = items.length
  const activeItems = items.filter(item => item.isActive !== false).length
  const inactiveItems = totalItems - activeItems

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

    try {
      const interval = setInterval(() => {
        setUploadProgress(prev => (prev >= 90 ? 90 : prev + 15))
      }, 150)

      const response = await fetch(`${API_BASE_URL}/api/media/upload`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
        body: formData,
      })

      clearInterval(interval)
      setUploadProgress(100)

      if (response.ok) {
        const data = await response.json()
        setFormValues(prev => ({ ...prev, image: data.url }))
        showToast('Image uploaded successfully.')
      } else {
        showToast('Upload failed.', 'error')
      }
    } catch (err) {
      showToast('Upload error.', 'error')
    } finally {
      setTimeout(() => {
        setUploading(false)
        setUploadProgress(0)
      }, 500)
    }
  }

  const handleOpenAddModal = () => {
    setCurrentItem(null)
    setFormValues({
      title: '', slug: '', category: '', year: '', tagsString: '', description: '',
      tagline: '', challenge: '', solution: '', resultsString: '', techString: '', client: '', duration: '', image: '', projectLink: '', isActive: true
    })
    setFormErrors({})
    setIsModalOpen(true)
  }

  const handleOpenEditModal = (item) => {
    setCurrentItem(item)
    setFormValues({
      title: item.title || '',
      slug: item.slug || '',
      category: item.category || '',
      year: item.year || '',
      tagsString: item.tags ? item.tags.join(', ') : '',
      description: item.description || '',
      tagline: item.tagline || '',
      challenge: item.challenge || '',
      solution: item.solution || '',
      resultsString: item.results ? item.results.map(r => `${r.metric}:${r.label}`).join(', ') : '',
      techString: item.tech ? item.tech.join(', ') : '',
      client: item.client || '',
      duration: item.duration || '',
      image: item.image || '',
      projectLink: item.projectLink || item.projectUrl || item.link || '',
      isActive: item.isActive !== false,
    })
    setFormErrors({})
    setIsModalOpen(true)
  }

  const validateForm = () => {
    const errors = {}
    if (!formValues.title?.trim()) errors.title = 'Title is required'
    if (!formValues.slug?.trim()) errors.slug = 'Slug is required'
    if (!formValues.category?.trim()) errors.category = 'Category is required'
    if (!formValues.description?.trim()) errors.description = 'Description is required'
    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSaveItem = async () => {
    if (!validateForm()) return
    setIsSaving(true)

    const parseString = (str) => str ? str.split(',').map(s => s.trim()).filter(Boolean) : []
    
    const parsedResults = formValues.resultsString ? formValues.resultsString.split(',').map(pair => {
      const parts = pair.split(':')
      return { metric: parts[0]?.trim() || '', label: parts[1]?.trim() || '' }
    }).filter(r => r.metric && r.label) : []

    const payload = {
      ...formValues,
      tags: parseString(formValues.tagsString),
      tech: parseString(formValues.techString),
      results: parsedResults
    }

    try {
      const url = currentItem
        ? `${API_BASE_URL}/api/portfolio/${currentItem.id}`
        : `${API_BASE_URL}/api/portfolio`
      
      const method = currentItem ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      })

      if (response.ok) {
        showToast(currentItem ? 'Item updated successfully!' : 'Item created successfully!')
        setIsModalOpen(false)
        fetchPortfolioData()
      } else {
        const errorData = await response.json()
        showToast(errorData.message || 'Failed to save item', 'error')
      }
    } catch (err) {
      showToast('API Connection Error', 'error')
    } finally {
      setIsSaving(false)
    }
  }

  const handleToggleActive = async (item) => {
    setActiveDropdownId(null)
    try {
      const res = await fetch(`${API_BASE_URL}/api/portfolio/${item.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ isActive: !item.isActive })
      })
      if (res.ok) {
        showToast(`Project ${item.isActive ? 'disabled' : 'enabled'} successfully!`)
        fetchPortfolioData()
      } else {
        showToast('Failed to toggle status', 'error')
      }
    } catch (err) {
      showToast('Connection error', 'error')
    }
  }

  const confirmDelete = async () => {
    if (!deleteItemTarget) return
    try {
      const res = await fetch(`${API_BASE_URL}/api/portfolio/${deleteItemTarget.id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      })
      if (res.ok) {
        showToast('Item deleted successfully')
        fetchPortfolioData()
      } else {
        showToast('Failed to delete item', 'error')
      }
    } catch (err) {
      showToast('Connection error', 'error')
    } finally {
      setIsDeleteModalOpen(false)
      setDeleteItemTarget(null)
    }
  }

  const filteredItems = items.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (item.client && item.client.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="w-full min-h-screen p-6 sm:p-8 bg-[#f8fafc] text-slate-800 font-sans">
      
      {/* Toast Notification */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`fixed top-6 right-6 z-50 flex items-center gap-3 px-5 py-3.5 rounded-xl shadow-lg border backdrop-blur-md`}
            style={{
              background: toast.type === 'error' ? 'rgba(254, 242, 242, 0.95)' : 'rgba(236, 253, 245, 0.95)',
              borderColor: toast.type === 'error' ? '#fca5a5' : '#6ee7b7',
              color: toast.type === 'error' ? '#991b1b' : '#065f46',
            }}
          >
            {toast.type === 'error' ? <FiAlertCircle size={18} /> : <FiCheck size={18} />}
            <span className="text-sm font-semibold">{toast.message}</span>
            <button onClick={() => setToast(null)} className="ml-2 text-slate-400 hover:text-slate-600 transition-opacity">
              <FiX size={16} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto">
        
        {/* Top Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight flex items-center gap-3">
              <span className="p-2 rounded-xl bg-orange-50 text-orange-600">
                <FiLayers size={24} />
              </span>
              Portfolio Registry
            </h1>
            <p className="text-sm text-slate-500 font-medium mt-1">
              Manage and audit registered portfolio projects across categories
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <button 
              onClick={fetchPortfolioData}
              className="p-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 transition-all shadow-sm"
              title="Refresh Registry"
            >
              <FiRefreshCw size={18} className={loading ? 'animate-spin' : ''} />
            </button>
            <button
              onClick={handleOpenAddModal}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#ff6b00] hover:bg-[#e05e00] text-white font-bold text-sm shadow-sm transition-all"
            >
              <FiPlus size={18} /> Add Project
            </button>
          </div>
        </div>

        {/* 4 Stat Cards Grid (Matching Beneficiaries Registry) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          
          {/* Stat 1 */}
          <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-[0_2px_12px_rgba(0,0,0,0.03)] flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center flex-shrink-0">
              <FiFolder size={22} />
            </div>
            <div>
              <div className="text-2xl font-bold text-slate-900">{totalItems}</div>
              <div className="text-xs font-bold text-slate-700">Total Projects</div>
              <div className="text-[10px] text-slate-400 font-medium">Registered database</div>
            </div>
          </div>

          {/* Stat 2 */}
          <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-[0_2px_12px_rgba(0,0,0,0.03)] flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0">
              <FiCheckCircle size={22} />
            </div>
            <div>
              <div className="text-2xl font-bold text-slate-900">{activeItems}</div>
              <div className="text-xs font-bold text-slate-700">Active Projects</div>
              <div className="text-[10px] text-slate-400 font-medium">Live on portfolio grid</div>
            </div>
          </div>

          {/* Stat 3 */}
          <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-[0_2px_12px_rgba(0,0,0,0.03)] flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0">
              <FiLayers size={22} />
            </div>
            <div>
              <div className="text-2xl font-bold text-slate-900">{uniqueCategories.length - 1}</div>
              <div className="text-xs font-bold text-slate-700">Categories</div>
              <div className="text-[10px] text-slate-400 font-medium">Active project sectors</div>
            </div>
          </div>

          {/* Stat 4 */}
          <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-[0_2px_12px_rgba(0,0,0,0.03)] flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-slate-100 text-slate-600 flex items-center justify-center flex-shrink-0">
              <FiClock size={22} />
            </div>
            <div>
              <div className="text-2xl font-bold text-slate-900">{inactiveItems}</div>
              <div className="text-xs font-bold text-slate-700">Draft Projects</div>
              <div className="text-[10px] text-slate-400 font-medium">On hold / Hidden</div>
            </div>
          </div>

        </div>

        {/* Filter Bar (Isolated White Card) */}
        <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-[0_2px_12px_rgba(0,0,0,0.03)] mb-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          
          {/* Search Input */}
          <div className="relative w-full sm:max-w-sm">
            <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input
              type="text"
              placeholder="Search projects by title, client..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium text-slate-700 placeholder-slate-400 focus:bg-white focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none transition-all"
            />
          </div>

          {/* Category Filter Pills */}
          <div className="flex gap-2 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {uniqueCategories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all border ${
                  selectedCategory === cat
                    ? 'bg-orange-500 text-white border-orange-500 shadow-sm'
                    : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

        </div>

        {/* Main Projects Table Card */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-[0_2px_12px_rgba(0,0,0,0.03)] overflow-hidden min-h-[420px]">
          
          <div className="overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="w-8 h-8 border-2 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : filteredItems.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-64 text-slate-400">
                <FiLayers size={36} className="mb-3 text-slate-300" />
                <p className="text-sm font-semibold text-slate-500">No registered projects found</p>
                <p className="text-xs text-slate-400 mt-1">Try adjusting your search query or filter category</p>
              </div>
            ) : (
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-100 bg-white">
                    <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider">#</th>
                    <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider">ID</th>
                    <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Project Profile</th>
                    <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Category</th>
                    <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Client / Details</th>
                    <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredItems.map((item, idx) => (
                    <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                      
                      {/* Index */}
                      <td className="px-6 py-4 text-xs font-semibold text-slate-400">
                        {idx + 1}
                      </td>

                      {/* ID */}
                      <td className="px-6 py-4 text-xs font-mono font-bold text-slate-700">
                        PRJ{String(idx + 1001).padStart(5, '0')}
                      </td>

                      {/* Project Profile */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          {item.image ? (
                            <img 
                              src={getImageUrl(item.image)} 
                              alt={item.title} 
                              className="w-10 h-10 rounded-xl object-cover border border-slate-200 shadow-sm flex-shrink-0"
                            />
                          ) : (
                            <div className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-400 flex-shrink-0">
                              <FiFolder size={18} />
                            </div>
                          )}
                          <div>
                            <div className="font-bold text-sm text-slate-800">{item.title}</div>
                            <div className="text-xs text-slate-400 font-mono mt-0.5">{item.slug}</div>
                          </div>
                        </div>
                      </td>

                      {/* Category */}
                      <td className="px-6 py-4">
                        <span className="inline-flex px-3 py-1 rounded-full text-xs font-semibold bg-orange-50 text-orange-600 border border-orange-100">
                          {item.category}
                        </span>
                      </td>

                      {/* Client / Details */}
                      <td className="px-6 py-4 text-xs text-slate-600 font-medium">
                        <div>{item.client || 'N/A'}</div>
                        <div className="text-[11px] text-slate-400">{item.year || 'Standard'}</div>
                      </td>

                      {/* Status Badge */}
                      <td className="px-6 py-4">
                        {item.isActive !== false ? (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-600 border border-emerald-100">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                            Active
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-500 border border-slate-200">
                            <span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span>
                            Draft
                          </span>
                        )}
                      </td>

                      {/* Gear Icon Dropdown Actions */}
                      <td className="px-6 py-4 text-right relative">
                        <div className="flex justify-end">
                          <button
                            onClick={() => setActiveDropdownId(activeDropdownId === item.id ? null : item.id)}
                            className="p-2 rounded-xl border border-slate-200 bg-white text-slate-500 hover:text-slate-900 hover:bg-slate-50 transition-all shadow-sm cursor-pointer"
                            title="Actions"
                          >
                            <FiSettings size={16} />
                          </button>
                        </div>

                        <AnimatePresence>
                          {activeDropdownId === item.id && (
                            <>
                              <div className="fixed inset-0 z-30" onClick={() => setActiveDropdownId(null)} />
                              <motion.div
                                initial={{ opacity: 0, scale: 0.95, y: 5 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95, y: 5 }}
                                className="absolute right-6 mt-2 w-44 z-40 p-1.5 bg-white border border-slate-100 rounded-xl shadow-xl text-left"
                              >
                                <button
                                  onClick={() => { setActiveDropdownId(null); setViewItemTarget(item); setIsViewModalOpen(true); }}
                                  className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 rounded-lg transition-colors cursor-pointer"
                                >
                                  <FiEye size={14} className="text-slate-400" />
                                  View Details
                                </button>
                                <button
                                  onClick={() => { setActiveDropdownId(null); handleOpenEditModal(item); }}
                                  className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 rounded-lg transition-colors cursor-pointer"
                                >
                                  <FiEdit2 size={14} className="text-slate-400" />
                                  Edit Project
                                </button>
                                <button
                                  onClick={() => handleToggleActive(item)}
                                  className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 rounded-lg transition-colors cursor-pointer"
                                >
                                  {item.isActive !== false ? (
                                    <>
                                      <FiXCircle size={14} className="text-amber-500" />
                                      <span>Disable Project</span>
                                    </>
                                  ) : (
                                    <>
                                      <FiCheckCircle size={14} className="text-emerald-500" />
                                      <span>Enable Project</span>
                                    </>
                                  )}
                                </button>
                                <div className="my-1 border-t border-slate-100"></div>
                                <button
                                  onClick={() => { setActiveDropdownId(null); setDeleteItemTarget(item); setIsDeleteModalOpen(true); }}
                                  className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                                >
                                  <FiTrash2 size={14} className="text-red-500" />
                                  Delete Project
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

      </div>

      {/* Add / Edit Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-[24px] shadow-2xl relative bg-white text-slate-800 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
            >
              {/* Header */}
              <div className="sticky top-0 z-10 flex justify-between items-center px-6 py-5 bg-white border-b border-gray-100 rounded-t-[24px]">
                <h3 className="text-xl font-bold font-display text-slate-800">
                  {currentItem ? 'Edit Project' : 'Add New Project'}
                </h3>
                <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-700 transition-colors">
                  <FiX size={22} />
                </button>
              </div>

              {/* Form Body */}
              <div className="px-6 py-6 space-y-5">
                
                {/* Project Title */}
                <div>
                  <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1.5">Project Title *</label>
                  <input
                    type="text"
                    placeholder="e.g. Website Development"
                    value={formValues.title}
                    onChange={(e) => setFormValues({ ...formValues, title: e.target.value })}
                    className={`w-full px-4 py-2.5 rounded-lg text-sm bg-white border ${formErrors.title ? 'border-red-500' : 'border-gray-300'} outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-all`}
                  />
                  {formErrors.title && <span className="text-[10px] text-red-500 mt-1">{formErrors.title}</span>}
                </div>

                {/* Slug & Category */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1.5">Slug *</label>
                    <input
                      type="text"
                      placeholder="e.g. website-development"
                      value={formValues.slug}
                      onChange={(e) => setFormValues({ ...formValues, slug: e.target.value })}
                      className={`w-full px-4 py-2.5 rounded-lg text-sm bg-white border ${formErrors.slug ? 'border-red-500' : 'border-gray-300'} outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-all`}
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1.5">Category *</label>
                    <select
                      value={formValues.category}
                      onChange={(e) => setFormValues({ ...formValues, category: e.target.value })}
                      className={`w-full px-4 py-2.5 rounded-lg text-sm bg-white border ${formErrors.category ? 'border-red-500' : 'border-gray-300'} outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-all`}
                    >
                      <option value="">Select Category</option>
                      <option value="Web Development">Web Development</option>
                      <option value="Digital Marketing">Digital Marketing</option>
                      <option value="Branding">Branding</option>
                      <option value="SEO">SEO</option>
                      <option value="App Development">App Development</option>
                    </select>
                  </div>
                </div>

                {/* Cover Image Upload Only */}
                <div>
                  <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1.5">Cover Image *</label>
                  <div className="flex items-center gap-3">
                    <label className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 cursor-pointer transition-all text-xs font-semibold text-gray-600">
                      <FiUploadCloud size={18} className="text-gray-500" />
                      <span>{uploading ? `Uploading (${uploadProgress}%)...` : (formValues.image ? 'Change Uploaded Image' : 'Upload Cover Image (PNG, JPG, GIF up to 5MB)')}</span>
                      <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} disabled={uploading} />
                    </label>
                    {formValues.image && (
                      <div className="relative group w-12 h-12 flex-shrink-0">
                        <img src={formValues.image} alt="Preview" className="w-12 h-12 object-cover rounded-lg border border-gray-200 shadow-sm" />
                        <button
                          type="button"
                          onClick={() => setFormValues({ ...formValues, image: '' })}
                          className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-red-500 text-white flex items-center justify-center shadow-md hover:bg-red-600 transition-colors"
                          title="Remove Image"
                        >
                          <FiX size={12} />
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Short Description */}
                <div>
                  <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1.5">Short Description *</label>
                  <input
                    type="text"
                    placeholder="Provide a brief summary of the project..."
                    value={formValues.description}
                    onChange={(e) => setFormValues({ ...formValues, description: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg text-sm bg-white border border-gray-300 outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-all"
                  />
                </div>

                {/* Client & Year */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1.5">Client</label>
                    <input
                      type="text"
                      placeholder="e.g. TechStore Inc."
                      value={formValues.client}
                      onChange={(e) => setFormValues({ ...formValues, client: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-lg text-sm bg-white border border-gray-300 outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1.5">Year / Duration</label>
                    <input
                      type="text"
                      placeholder="e.g. 2024 (8 Weeks)"
                      value={formValues.year}
                      onChange={(e) => setFormValues({ ...formValues, year: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-lg text-sm bg-white border border-gray-300 outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-all"
                    />
                  </div>
                </div>

                {/* Project Live Link */}
                <div>
                  <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1.5">Project Link / Live URL</label>
                  <input
                    type="url"
                    placeholder="e.g. https://savitramfoundation.org or https://myproject.com"
                    value={formValues.projectLink}
                    onChange={(e) => setFormValues({ ...formValues, projectLink: e.target.value, projectUrl: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg text-sm bg-white border border-gray-300 outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-all font-mono"
                  />
                </div>

                {/* Tags & Tech Stack */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1.5">Tags (Comma-Separated)</label>
                    <input
                      type="text"
                      placeholder="e.g. React, Branding, Marketing"
                      value={formValues.tagsString}
                      onChange={(e) => setFormValues({ ...formValues, tagsString: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-lg text-sm bg-white border border-gray-300 outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1.5">Tech Stack (Comma-Separated)</label>
                    <input
                      type="text"
                      placeholder="e.g. Figma, Tailwind, Node.js"
                      value={formValues.techString}
                      onChange={(e) => setFormValues({ ...formValues, techString: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-lg text-sm bg-white border border-gray-300 outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-all"
                    />
                  </div>
                </div>
                
                {/* Case Study Details Section */}
                <h4 className="text-[12px] font-bold text-slate-800 uppercase tracking-wider mt-6 border-b border-gray-200 pb-2">Case Study Details</h4>

                <div>
                  <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1.5">Challenge</label>
                  <textarea
                    placeholder="Describe the challenge..."
                    value={formValues.challenge}
                    onChange={(e) => setFormValues({ ...formValues, challenge: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg text-sm bg-white border border-gray-300 outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-all h-20 resize-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1.5">Solution</label>
                  <textarea
                    placeholder="Describe the solution..."
                    value={formValues.solution}
                    onChange={(e) => setFormValues({ ...formValues, solution: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg text-sm bg-white border border-gray-300 outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-all h-20 resize-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1.5">Results (Format: Metric:Label, e.g. +300%:Conversion Rate)</label>
                  <input
                    type="text"
                    placeholder="e.g. +300%:Conversion Rate, +2M:Revenue"
                    value={formValues.resultsString}
                    onChange={(e) => setFormValues({ ...formValues, resultsString: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg text-sm bg-white border border-gray-300 outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-all"
                  />
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <input
                    type="checkbox"
                    id="isActive"
                    checked={formValues.isActive}
                    onChange={(e) => setFormValues({ ...formValues, isActive: e.target.checked })}
                    className="w-4 h-4 text-green-600 rounded border-gray-300 focus:ring-green-500"
                  />
                  <label htmlFor="isActive" className="text-[11px] font-bold text-gray-500 uppercase cursor-pointer">Active / Published</label>
                </div>
              </div>

              {/* Footer */}
              <div className="sticky bottom-0 px-6 py-4 border-t border-gray-100 flex justify-end gap-3 bg-white rounded-b-[24px]">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2 rounded-lg text-sm font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200 transition-colors"
                  disabled={isSaving}
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveItem}
                  disabled={isSaving}
                  className="px-6 py-2 rounded-lg text-sm font-bold bg-[#0f172a] text-white hover:bg-[#1e293b] transition-all flex items-center justify-center min-w-[120px] shadow-md"
                >
                  {isSaving ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    'Save Project'
                  )}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* View Details Modal */}
      <AnimatePresence>
        {isViewModalOpen && viewItemTarget && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-[24px] shadow-2xl relative bg-white text-slate-800 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
            >
              <div className="sticky top-0 z-10 flex justify-between items-center px-6 py-5 bg-white border-b border-gray-100 rounded-t-[24px]">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-orange-600 bg-orange-50 px-2.5 py-0.5 rounded-full border border-orange-100">
                    {viewItemTarget.category}
                  </span>
                  <h3 className="text-xl font-bold font-display text-slate-800 mt-1">
                    {viewItemTarget.title}
                  </h3>
                </div>
                <button onClick={() => setIsViewModalOpen(false)} className="text-gray-400 hover:text-gray-700 transition-colors p-1">
                  <FiX size={22} />
                </button>
              </div>

              <div className="p-6 space-y-5">
                {viewItemTarget.image && (
                  <div className="w-full h-48 rounded-xl overflow-hidden border border-slate-200 shadow-sm">
                    <img
                      src={getImageUrl(viewItemTarget.image)}
                      alt={viewItemTarget.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-100">
                  <div>
                    <span className="text-[10px] font-bold uppercase text-slate-400 block">Slug</span>
                    <span className="text-xs font-mono font-bold text-slate-700">{viewItemTarget.slug}</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase text-slate-400 block">Client</span>
                    <span className="text-xs font-semibold text-slate-700">{viewItemTarget.client || 'N/A'}</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase text-slate-400 block">Year / Duration</span>
                    <span className="text-xs font-semibold text-slate-700">{viewItemTarget.year || 'N/A'}</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase text-slate-400 block">Status</span>
                    <span className={`text-xs font-bold ${viewItemTarget.isActive !== false ? 'text-emerald-600' : 'text-slate-500'}`}>
                      {viewItemTarget.isActive !== false ? '● Active' : '○ Draft'}
                    </span>
                  </div>
                </div>

                {(viewItemTarget.projectLink || viewItemTarget.projectUrl || viewItemTarget.link) && (
                  <div>
                    <span className="text-[10px] font-bold uppercase text-slate-400 block mb-1">Live Project Link</span>
                    <a
                      href={viewItemTarget.projectLink || viewItemTarget.projectUrl || viewItemTarget.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-emerald-600 hover:text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-100"
                    >
                      <span>{viewItemTarget.projectLink || viewItemTarget.projectUrl || viewItemTarget.link}</span>
                      <FiExternalLink size={12} />
                    </a>
                  </div>
                )}

                <div>
                  <span className="text-[10px] font-bold uppercase text-slate-400 block mb-1">Description</span>
                  <p className="text-xs text-slate-600 leading-relaxed">{viewItemTarget.description}</p>
                </div>

                {viewItemTarget.tagline && (
                  <div>
                    <span className="text-[10px] font-bold uppercase text-slate-400 block mb-1">Tagline</span>
                    <p className="text-xs font-semibold text-slate-800">{viewItemTarget.tagline}</p>
                  </div>
                )}

                {viewItemTarget.challenge && (
                  <div>
                    <span className="text-[10px] font-bold uppercase text-slate-400 block mb-1">Challenge</span>
                    <p className="text-xs text-slate-600 leading-relaxed bg-amber-50/50 p-3 rounded-lg border border-amber-100">{viewItemTarget.challenge}</p>
                  </div>
                )}

                {viewItemTarget.solution && (
                  <div>
                    <span className="text-[10px] font-bold uppercase text-slate-400 block mb-1">Solution</span>
                    <p className="text-xs text-slate-600 leading-relaxed bg-emerald-50/50 p-3 rounded-lg border border-emerald-100">{viewItemTarget.solution}</p>
                  </div>
                )}

                {Array.isArray(viewItemTarget.results) && viewItemTarget.results.length > 0 && (
                  <div>
                    <span className="text-[10px] font-bold uppercase text-slate-400 block mb-2">Results</span>
                    <div className="grid grid-cols-2 gap-2">
                      {viewItemTarget.results.map((r, i) => (
                        <div key={i} className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-center">
                          <div className="text-sm font-extrabold text-orange-600">{r.metric}</div>
                          <div className="text-[10px] font-semibold text-slate-500">{r.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="sticky bottom-0 px-6 py-4 border-t border-gray-100 flex justify-end bg-white rounded-b-[24px]">
                <button
                  onClick={() => setIsViewModalOpen(false)}
                  className="px-5 py-2 rounded-lg text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Delete Modal */}
      <AnimatePresence>
        {isDeleteModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60"
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="w-full max-w-sm rounded-2xl p-6 border shadow-2xl text-center bg-white"
            >
              <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto mb-4">
                <FiTrash2 size={24} />
              </div>
              <h3 className="text-lg font-bold text-slate-800 mb-2">Delete Project?</h3>
              <p className="text-sm text-slate-500 mb-6">
                Are you sure you want to delete <strong className="text-slate-800">"{deleteItemTarget?.title}"</strong>? This action cannot be undone.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setIsDeleteModalOpen(false)}
                  className="flex-1 py-2 rounded-xl text-sm font-semibold border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  className="flex-1 py-2 rounded-xl text-sm font-bold bg-red-600 text-white hover:bg-red-700 transition-colors shadow-sm"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  )
}

export default AdminPortfolio
