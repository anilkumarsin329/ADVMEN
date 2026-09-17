import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  FiTrash2, FiEdit2, FiPlus, FiImage, FiBriefcase, 
  FiX, FiSearch, FiExternalLink, FiEye, FiSettings,
  FiMoreVertical, FiCheckCircle, FiTag, FiCpu
} from 'react-icons/fi'
import { useAdminAuth } from '@/admin/context/AdminAuthContext'
import { API_BASE_URL, getImageUrl } from '../../utils/constants'

const CATEGORIES = [
  'Web Development',
  'Digital Marketing',
  'App Development',
  'SEO & Content',
  'Branding',
  'Media Production',
  'AI & Cloud',
  'Other',
]

const AdminCaseStudies = () => {
  const { token } = useAdminAuth()
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  
  // Modals & Dropdowns State
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentItem, setCurrentItem] = useState(null)
  const [viewItem, setViewItem] = useState(null) // For View Details Modal
  const [activeDropdown, setActiveDropdown] = useState(null) // ID of card with open gear menu
  
  // Form State
  const [title, setTitle] = useState('')
  const [slug, setSlug] = useState('')
  const [client, setClient] = useState('')
  const [category, setCategory] = useState('Web Development')
  const [summary, setSummary] = useState('')
  const [description, setDescription] = useState('')
  const [challenge, setChallenge] = useState('')
  const [solution, setSolution] = useState('')
  const [image, setImage] = useState('')
  const [projectUrl, setProjectUrl] = useState('')
  const [status, setStatus] = useState('Active')
  const [order, setOrder] = useState(1)
  
  // Metrics Array [{ value, label }]
  const [metrics, setMetrics] = useState([
    { value: '+15%', label: 'Conversion Rate' },
    { value: '30%', label: 'Faster Load' }
  ])
  
  // Tech & Tags (Comma separated strings in form)
  const [techInput, setTechInput] = useState('')
  const [tagsInput, setTagsInput] = useState('')
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  const fileInputRef = useRef(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (!e.target.closest('.gear-dropdown-container')) {
        setActiveDropdown(null)
      }
    }
    document.addEventListener('click', handleOutsideClick)
    return () => document.removeEventListener('click', handleOutsideClick)
  }, [])

  useEffect(() => {
    fetchCaseStudies()
  }, [])

  const fetchCaseStudies = async () => {
    try {
      setLoading(true)
      const response = await fetch(`${API_BASE_URL}/api/case-studies/all`, {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      const data = await response.json()
      if (response.ok) {
        setItems(data.data || [])
      } else {
        setError(data.message || 'Failed to fetch case studies')
      }
    } catch (err) {
      setError('A network error occurred while fetching case studies.')
    } finally {
      setLoading(false)
    }
  }

  const handleImageUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    const formData = new FormData()
    formData.append('file', file)

    try {
      const response = await fetch(`${API_BASE_URL}/api/media/upload`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
        body: formData
      })
      const data = await response.json()
      if (response.ok) {
        setImage(data.url)
      } else {
        alert(data.error || 'Failed to upload image')
      }
    } catch (err) {
      alert('Error uploading file')
    }
  }

  const openModal = (item = null) => {
    if (item) {
      setCurrentItem(item)
      setTitle(item.title || '')
      setSlug(item.slug || '')
      setClient(item.client || '')
      setCategory(item.category || 'Web Development')
      setSummary(item.summary || '')
      setDescription(item.description || '')
      setChallenge(item.challenge || '')
      setSolution(item.solution || '')
      setImage(item.image || '')
      setProjectUrl(item.projectUrl || '')
      setStatus(item.status || 'Active')
      setOrder(item.order || 1)
      setMetrics(item.metrics && item.metrics.length > 0 ? item.metrics : [{ value: '', label: '' }])
      setTechInput(Array.isArray(item.tech) ? item.tech.join(', ') : '')
      setTagsInput(Array.isArray(item.tags) ? item.tags.join(', ') : '')
    } else {
      setCurrentItem(null)
      setTitle('')
      setSlug('')
      setClient('')
      setCategory('Web Development')
      setSummary('')
      setDescription('')
      setChallenge('')
      setSolution('')
      setImage('')
      setProjectUrl('')
      setStatus('Active')
      setOrder(items.length + 1)
      setMetrics([{ value: '+40%', label: 'Monthly Leads' }, { value: '+25%', label: 'Engagement' }])
      setTechInput('React, Node.js, Tailwind CSS')
      setTagsInput('Web Development, UI/UX')
    }
    setIsModalOpen(true)
    setActiveDropdown(null)
  }

  const handleTitleChange = (val) => {
    setTitle(val)
    if (!currentItem) {
      const generatedSlug = val.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')
      setSlug(generatedSlug)
    }
  }

  const handleAddMetric = () => {
    setMetrics([...metrics, { value: '', label: '' }])
  }

  const handleRemoveMetric = (index) => {
    setMetrics(metrics.filter((_, i) => i !== index))
  }

  const handleMetricChange = (index, field, value) => {
    const updated = [...metrics]
    updated[index][field] = value
    setMetrics(updated)
  }

  const handleSave = async (e) => {
    e.preventDefault()
    if (!title || !client || !summary || !image) {
      alert('Please fill in Title, Client, Summary, and upload an Image.')
      return
    }

    setIsSubmitting(true)
    
    const payload = {
      title,
      slug: slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      client,
      category,
      summary,
      description,
      challenge,
      solution,
      image,
      projectUrl,
      status,
      order: Number(order),
      metrics: JSON.stringify(metrics.filter(m => m.value.trim() && m.label.trim())),
      tech: JSON.stringify(techInput.split(',').map(s => s.trim()).filter(Boolean)),
      tags: JSON.stringify(tagsInput.split(',').map(s => s.trim()).filter(Boolean)),
    }

    const url = currentItem 
      ? `${API_BASE_URL}/api/case-studies/${currentItem._id}`
      : `${API_BASE_URL}/api/case-studies`
      
    const method = currentItem ? 'PUT' : 'POST'

    try {
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      })

      const data = await response.json()

      if (response.ok) {
        setIsModalOpen(false)
        fetchCaseStudies()
      } else {
        alert(data.message || 'Failed to save case study')
      }
    } catch (err) {
      alert('Network error while saving case study')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDelete = async (id) => {
    setActiveDropdown(null)
    if (!window.confirm('Are you sure you want to delete this Case Study?')) return

    try {
      const response = await fetch(`${API_BASE_URL}/api/case-studies/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      })

      if (response.ok) {
        fetchCaseStudies()
      } else {
        alert('Failed to delete case study')
      }
    } catch (err) {
      alert('Error deleting case study')
    }
  }

  const filteredItems = items.filter(item => 
    item.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.client?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.category?.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <FiBriefcase className="text-[var(--color-orange)]" />
            Case Studies Management
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Create, edit, and organize success stories displayed on the website.
          </p>
        </div>

        <button 
          onClick={() => openModal()}
          className="flex items-center gap-2 px-5 py-2.5 bg-[var(--color-orange)] text-white font-semibold rounded-xl text-sm hover:opacity-90 transition-all shadow-md shadow-orange-500/20"
        >
          <FiPlus size={18} />
          Add New Case Study
        </button>
      </div>

      {/* Search Bar */}
      <div className="relative max-w-md">
        <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
        <input 
          type="text"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          placeholder="Search by title, client, or category..."
          className="w-full pl-11 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
        />
      </div>

      {/* Items List / Table */}
      {loading ? (
        <div className="py-20 text-center text-gray-400">Loading case studies...</div>
      ) : filteredItems.length === 0 ? (
        <div className="py-16 text-center bg-white rounded-2xl border border-gray-100 border-dashed">
          <div className="w-16 h-16 bg-orange-50 text-[var(--color-orange)] rounded-full flex items-center justify-center mx-auto mb-4">
            <FiBriefcase size={28} />
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-1">No Case Studies Found</h3>
          <p className="text-gray-500 text-sm mb-4">Add your first case study to display it on the website.</p>
          <button 
            onClick={() => openModal()}
            className="text-[var(--color-orange)] font-semibold text-sm hover:underline"
          >
            Add Case Study Now
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div 
              key={item._id}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col justify-between hover:shadow-md transition-shadow relative"
            >
              {/* Cover Image Header */}
              <div className="relative aspect-video w-full bg-slate-800 overflow-hidden group">
                <img 
                  src={getImageUrl(item.image)} 
                  alt={item.title} 
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/Image/advmen_service1.webp';
                  }}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                />
                <span className="absolute top-3 left-3 px-3 py-1 bg-black/70 backdrop-blur-md text-white font-mono text-[10px] font-semibold uppercase tracking-wider rounded-full">
                  {item.category}
                </span>
                <span className={`absolute top-3 right-3 px-2.5 py-1 text-[10px] font-bold rounded-full uppercase tracking-wider ${
                  item.status === 'Active' ? 'bg-emerald-500/90 text-white' : 'bg-gray-500/90 text-white'
                }`}>
                  {item.status}
                </span>
              </div>

              {/* Body Info */}
              <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                <div>
                  <div className="text-[11px] font-mono font-semibold uppercase text-orange-600 tracking-wider">
                    {item.client}
                  </div>
                  <h3 className="text-base font-bold text-gray-900 mt-1 line-clamp-1">
                    {item.title}
                  </h3>
                  <p className="text-xs text-gray-500 line-clamp-2 mt-1">
                    {item.summary}
                  </p>
                </div>

                {/* Metrics Highlights */}
                {item.metrics && item.metrics.length > 0 && (
                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-gray-100">
                    {item.metrics.slice(0, 2).map((m, idx) => (
                      <div key={idx} className="bg-orange-50/60 p-2 rounded-lg text-center">
                        <div className="text-xs font-bold text-orange-600">{m.value}</div>
                        <div className="text-[9px] text-gray-500 uppercase font-mono">{m.label}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Card Footer with Gear Dropdown */}
              <div className="px-5 py-3 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
                <a 
                  href={`/work/${item.slug}`} 
                  target="_blank" 
                  rel="noreferrer"
                  className="text-xs text-gray-500 hover:text-orange-600 flex items-center gap-1 font-semibold"
                >
                  <FiEye size={14} /> Preview
                </a>

                {/* Gear Settings Icon Dropdown */}
                <div className="relative gear-dropdown-container">
                  <button 
                    onClick={(e) => {
                      e.stopPropagation()
                      setActiveDropdown(activeDropdown === item._id ? null : item._id)
                    }}
                    className={`p-2 rounded-lg transition-colors border ${
                      activeDropdown === item._id 
                        ? 'bg-orange-50 text-orange-600 border-orange-200' 
                        : 'text-gray-600 hover:text-orange-600 hover:bg-white border-transparent'
                    }`}
                    title="Case Study Actions"
                  >
                    <FiSettings size={17} className={activeDropdown === item._id ? 'rotate-90 transition-transform duration-300' : 'transition-transform duration-300'} />
                  </button>

                  {/* Dropdown Menu */}
                  <AnimatePresence>
                    {activeDropdown === item._id && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: -5 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -5 }}
                        transition={{ duration: 0.15 }}
                        className="absolute right-0 bottom-10 w-44 bg-white rounded-xl shadow-xl border border-gray-100 py-1.5 z-30"
                      >
                        <button
                          onClick={() => {
                            setViewItem(item)
                            setActiveDropdown(null)
                          }}
                          className="w-full px-4 py-2 text-left text-xs font-semibold text-gray-700 hover:bg-orange-50 hover:text-orange-600 flex items-center gap-2 transition-colors"
                        >
                          <FiEye size={14} className="text-gray-400 group-hover:text-orange-600" />
                          View Details
                        </button>

                        <button
                          onClick={() => openModal(item)}
                          className="w-full px-4 py-2 text-left text-xs font-semibold text-gray-700 hover:bg-orange-50 hover:text-orange-600 flex items-center gap-2 transition-colors"
                        >
                          <FiEdit2 size={14} className="text-gray-400" />
                          Edit Case Study
                        </button>

                        <div className="my-1 border-t border-gray-100" />

                        <button
                          onClick={() => handleDelete(item._id)}
                          className="w-full px-4 py-2 text-left text-xs font-semibold text-red-600 hover:bg-red-50 flex items-center gap-2 transition-colors"
                        >
                          <FiTrash2 size={14} />
                          Delete
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── View Details Modal ────────────────────────────────────── */}
      <AnimatePresence>
        {viewItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setViewItem(null)}
              className="absolute inset-0 bg-gray-900/50 backdrop-blur-xs"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative bg-white rounded-2xl shadow-2xl w-full max-w-3xl overflow-hidden max-h-[90vh] flex flex-col"
            >
              {/* Header */}
              <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between shrink-0">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 bg-orange-100 text-orange-700 font-mono text-[10px] font-bold uppercase rounded-full">
                    {viewItem.category}
                  </span>
                  <h2 className="text-base font-bold text-gray-900">{viewItem.title}</h2>
                </div>
                <button 
                  onClick={() => setViewItem(null)}
                  className="text-gray-400 hover:text-gray-600 p-1.5 rounded-lg hover:bg-gray-100"
                >
                  <FiX size={18} />
                </button>
              </div>

              {/* Scrollable Content Body */}
              <div className="p-6 overflow-y-auto space-y-6 flex-1 text-gray-800">
                {/* Banner Image */}
                <div className="w-full h-56 rounded-xl overflow-hidden bg-slate-900 relative">
                  <img 
                    src={getImageUrl(viewItem.image)} 
                    alt={viewItem.title} 
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = '/Image/advmen_service1.webp';
                    }}
                    className="w-full h-full object-cover" 
                  />
                  <div className="absolute bottom-3 left-3 bg-black/70 backdrop-blur-md px-3 py-1 rounded-lg text-white font-mono text-xs">
                    Client: <strong>{viewItem.client}</strong>
                  </div>
                </div>

                {/* Summary */}
                <div>
                  <h4 className="text-xs font-mono font-bold uppercase text-gray-400 tracking-wider mb-1">
                    Summary Excerpt
                  </h4>
                  <p className="text-sm text-gray-700 leading-relaxed font-medium bg-gray-50 p-3.5 rounded-xl border border-gray-100">
                    {viewItem.summary}
                  </p>
                </div>

                {/* Metrics Badges */}
                {viewItem.metrics && viewItem.metrics.length > 0 && (
                  <div>
                    <h4 className="text-xs font-mono font-bold uppercase text-gray-400 tracking-wider mb-2">
                      Key Performance Metrics
                    </h4>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {viewItem.metrics.map((m, idx) => (
                        <div key={idx} className="bg-orange-50 border border-orange-100 p-3 rounded-xl text-center">
                          <div className="text-lg font-bold text-orange-600">{m.value}</div>
                          <div className="text-[10px] text-gray-600 font-mono uppercase mt-0.5">{m.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Challenge & Solution */}
                {(viewItem.challenge || viewItem.solution) && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {viewItem.challenge && (
                      <div className="bg-red-50/50 border border-red-100 p-4 rounded-xl">
                        <h4 className="text-xs font-bold text-red-700 uppercase tracking-wider mb-1">
                          The Challenge
                        </h4>
                        <p className="text-xs text-gray-600 leading-relaxed">{viewItem.challenge}</p>
                      </div>
                    )}
                    {viewItem.solution && (
                      <div className="bg-emerald-50/50 border border-emerald-100 p-4 rounded-xl">
                        <h4 className="text-xs font-bold text-emerald-700 uppercase tracking-wider mb-1">
                          Our Solution
                        </h4>
                        <p className="text-xs text-gray-600 leading-relaxed">{viewItem.solution}</p>
                      </div>
                    )}
                  </div>
                )}

                {/* Tech & Tags */}
                <div className="flex flex-wrap gap-4 pt-2">
                  {viewItem.tech && viewItem.tech.length > 0 && (
                    <div>
                      <h4 className="text-[10px] font-mono font-bold uppercase text-gray-400 tracking-wider mb-1.5 flex items-center gap-1">
                        <FiCpu size={12} /> Tech Stack
                      </h4>
                      <div className="flex flex-wrap gap-1.5">
                        {viewItem.tech.map((t, idx) => (
                          <span key={idx} className="px-2.5 py-1 bg-gray-100 text-gray-700 font-mono text-[11px] rounded-lg">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {viewItem.tags && viewItem.tags.length > 0 && (
                    <div>
                      <h4 className="text-[10px] font-mono font-bold uppercase text-gray-400 tracking-wider mb-1.5 flex items-center gap-1">
                        <FiTag size={12} /> Tags
                      </h4>
                      <div className="flex flex-wrap gap-1.5">
                        {viewItem.tags.map((t, idx) => (
                          <span key={idx} className="px-2.5 py-1 bg-orange-50 text-orange-700 font-mono text-[11px] rounded-lg">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* View Modal Footer */}
              <div className="px-6 py-3 bg-gray-50 border-t border-gray-100 flex items-center justify-between shrink-0">
                <a 
                  href={`/work/${viewItem.slug}`} 
                  target="_blank" 
                  rel="noreferrer"
                  className="text-xs text-orange-600 font-semibold hover:underline flex items-center gap-1"
                >
                  <FiExternalLink size={14} /> Open Live Page
                </a>

                <div className="flex items-center gap-3">
                  <button 
                    onClick={() => setViewItem(null)}
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-xl text-xs font-semibold hover:bg-gray-300"
                  >
                    Close
                  </button>
                  <button 
                    onClick={() => {
                      const item = viewItem
                      setViewItem(null)
                      openModal(item)
                    }}
                    className="px-4 py-2 bg-[var(--color-orange)] text-white rounded-xl text-xs font-semibold hover:opacity-90 flex items-center gap-1.5"
                  >
                    <FiEdit2 size={14} /> Edit Case Study
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ── Add/Edit Modal Form ──────────────────────────────────── */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-gray-900/45"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative bg-white rounded-2xl shadow-xl w-full max-w-2xl overflow-hidden max-h-[90vh] flex flex-col"
            >
              {/* Modal Header */}
              <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between shrink-0">
                <h2 className="text-lg font-bold text-gray-900">
                  {currentItem ? 'Edit Case Study' : 'Add New Case Study'}
                </h2>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="text-gray-400 hover:text-gray-600 p-1 rounded-md"
                >
                  <FiX size={20} />
                </button>
              </div>

              {/* Modal Form Scrollable Body */}
              <form onSubmit={handleSave} className="p-6 overflow-y-auto space-y-4 flex-1">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Title *</label>
                    <input 
                      type="text" 
                      required
                      value={title}
                      onChange={e => handleTitleChange(e.target.value)}
                      className="w-full border border-gray-200 rounded-xl px-3.5 py-2 text-sm text-gray-900 bg-white focus:outline-none focus:border-orange-500"
                      placeholder="e.g. E-Commerce Platform Redesign"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">URL Slug *</label>
                    <input 
                      type="text" 
                      required
                      value={slug}
                      onChange={e => setSlug(e.target.value)}
                      className="w-full border border-gray-200 rounded-xl px-3.5 py-2 text-sm text-gray-900 bg-white focus:outline-none focus:border-orange-500"
                      placeholder="e.g. e-commerce-platform-redesign"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Client Name *</label>
                    <input 
                      type="text" 
                      required
                      value={client}
                      onChange={e => setClient(e.target.value)}
                      className="w-full border border-gray-200 rounded-xl px-3.5 py-2 text-sm text-gray-900 bg-white focus:outline-none focus:border-orange-500"
                      placeholder="e.g. TechStore Inc."
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Category *</label>
                    <select
                      value={category}
                      onChange={e => setCategory(e.target.value)}
                      className="w-full border border-gray-200 rounded-xl px-3.5 py-2 text-sm text-gray-900 bg-white focus:outline-none focus:border-orange-500"
                    >
                      {CATEGORIES.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Image Upload */}
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Cover Image *</label>
                  <div className="flex items-center gap-4">
                    {image ? (
                      <div className="relative w-28 h-20 rounded-lg border border-gray-200 bg-gray-50 flex items-center justify-center overflow-hidden shrink-0">
                        <img src={getImageUrl(image)} alt="Cover" className="w-full h-full object-cover" />
                        <button
                          type="button"
                          onClick={() => setImage('')}
                          className="absolute top-1 right-1 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center text-xs"
                        >
                          <FiX size={12} />
                        </button>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="w-28 h-20 rounded-lg border-2 border-dashed border-gray-200 text-gray-400 hover:text-gray-600 flex flex-col items-center justify-center gap-1 shrink-0"
                      >
                        <FiImage size={18} />
                        <span className="text-[10px] font-medium uppercase">Upload</span>
                      </button>
                    )}
                    <input 
                      type="file" 
                      ref={fileInputRef} 
                      onChange={handleImageUpload} 
                      accept="image/*" 
                      className="hidden" 
                    />
                    <div className="flex-1">
                      <input 
                        type="text" 
                        value={image} 
                        onChange={e => setImage(e.target.value)}
                        placeholder="Or enter image URL path e.g. /Image/advmen_service3.jpeg"
                        className="w-full border border-gray-200 rounded-xl px-3.5 py-2 text-xs text-gray-900 bg-white focus:outline-none focus:border-orange-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Summary */}
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Summary Excerpt *</label>
                  <textarea 
                    rows={2}
                    required
                    value={summary}
                    onChange={e => setSummary(e.target.value)}
                    className="w-full border border-gray-200 rounded-xl px-3.5 py-2 text-sm text-gray-900 bg-white focus:outline-none focus:border-orange-500"
                    placeholder="Short summary displayed on homepage card..."
                  />
                </div>

                {/* Dynamic Metrics */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-xs font-semibold text-gray-700">Key Metric Badges</label>
                    <button 
                      type="button"
                      onClick={handleAddMetric}
                      className="text-xs text-orange-600 font-semibold hover:underline flex items-center gap-1"
                    >
                      <FiPlus size={14} /> Add Metric
                    </button>
                  </div>
                  <div className="space-y-2">
                    {metrics.map((m, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <input 
                          type="text"
                          value={m.value}
                          onChange={e => handleMetricChange(idx, 'value', e.target.value)}
                          placeholder="Value e.g. +40%"
                          className="w-1/3 border border-gray-200 rounded-xl px-3 py-1.5 text-xs text-gray-900 bg-white focus:outline-none focus:border-orange-500"
                        />
                        <input 
                          type="text"
                          value={m.label}
                          onChange={e => handleMetricChange(idx, 'label', e.target.value)}
                          placeholder="Label e.g. Monthly Leads"
                          className="flex-1 border border-gray-200 rounded-xl px-3 py-1.5 text-xs text-gray-900 bg-white focus:outline-none focus:border-orange-500"
                        />
                        <button 
                          type="button"
                          onClick={() => handleRemoveMetric(idx)}
                          className="p-1.5 text-gray-400 hover:text-red-600"
                        >
                          <FiTrash2 size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Problem & Solution */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Challenge / Problem</label>
                    <textarea 
                      rows={3}
                      value={challenge}
                      onChange={e => setChallenge(e.target.value)}
                      className="w-full border border-gray-200 rounded-xl px-3.5 py-2 text-xs text-gray-900 bg-white focus:outline-none focus:border-orange-500"
                      placeholder="What challenge did the client face?"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Our Solution</label>
                    <textarea 
                      rows={3}
                      value={solution}
                      onChange={e => setSolution(e.target.value)}
                      className="w-full border border-gray-200 rounded-xl px-3.5 py-2 text-xs text-gray-900 bg-white focus:outline-none focus:border-orange-500"
                      placeholder="How did ADVMEN solve the problem?"
                    />
                  </div>
                </div>

                {/* Tech & Tags */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Tech Stack (comma separated)</label>
                    <input 
                      type="text" 
                      value={techInput}
                      onChange={e => setTechInput(e.target.value)}
                      className="w-full border border-gray-200 rounded-xl px-3.5 py-2 text-xs text-gray-900 bg-white focus:outline-none focus:border-orange-500"
                      placeholder="React, Node.js, Tailwind CSS"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Tags (comma separated)</label>
                    <input 
                      type="text" 
                      value={tagsInput}
                      onChange={e => setTagsInput(e.target.value)}
                      className="w-full border border-gray-200 rounded-xl px-3.5 py-2 text-xs text-gray-900 bg-white focus:outline-none focus:border-orange-500"
                      placeholder="Web Development, UI/UX"
                    />
                  </div>
                </div>

                {/* Status & Order */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Status</label>
                    <select
                      value={status}
                      onChange={e => setStatus(e.target.value)}
                      className="w-full border border-gray-200 rounded-xl px-3.5 py-2 text-sm text-gray-900 bg-white focus:outline-none focus:border-orange-500"
                    >
                      <option value="Active">Active (Visible)</option>
                      <option value="Draft">Draft (Hidden)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Display Order</label>
                    <input 
                      type="number" 
                      value={order}
                      onChange={e => setOrder(e.target.value)}
                      className="w-full border border-gray-200 rounded-xl px-3.5 py-2 text-sm text-gray-900 bg-white focus:outline-none focus:border-orange-500"
                    />
                  </div>
                </div>

                {/* Form Buttons */}
                <div className="pt-4 flex items-center gap-3">
                  <button 
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="flex-1 px-4 py-2.5 bg-gray-100 text-gray-700 rounded-xl text-sm font-semibold hover:bg-gray-200 transition-colors"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 px-4 py-2.5 bg-[var(--color-orange)] text-white rounded-xl text-sm font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 flex justify-center"
                  >
                    {isSubmitting ? 'Saving...' : (currentItem ? 'Update Case Study' : 'Save Case Study')}
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

export default AdminCaseStudies
