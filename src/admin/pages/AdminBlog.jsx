/**
 * admin/pages/AdminBlog.jsx
 */

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FiFileText, FiPlus, FiEdit2, FiTrash2, FiX, FiCheck, FiAlertCircle,
  FiSearch, FiCheckCircle, FiClock, FiRefreshCw, FiSettings, FiEye,
  FiXCircle, FiUser, FiTag, FiUploadCloud, FiCalendar
} from 'react-icons/fi'
import { useAdminAuth } from '@/admin/context/AdminAuthContext'
import { API_BASE_URL, getImageUrl } from '../../utils/constants'

const TOOLBAR_BTNS = [
  { label: 'H2',    before: '<h2>',          after: '</h2>' },
  { label: 'H3',    before: '<h3>',          after: '</h3>' },
  { label: 'B',     before: '<strong>',      after: '</strong>' },
  { label: 'I',     before: '<em>',          after: '</em>' },
  { label: 'P',     before: '<p>',           after: '</p>' },
  { label: 'UL',    before: '<ul>\n  <li>',  after: '</li>\n</ul>' },
  { label: 'OL',    before: '<ol>\n  <li>',  after: '</li>\n</ol>' },
  { label: 'LI',    before: '<li>',          after: '</li>' },
  { label: 'Quote', before: '<blockquote>',  after: '</blockquote>' },
]

const HtmlEditor = ({ value, onChange }) => {
  const [tab, setTab] = useState('write')

  const insertTag = (before, after) => {
    const ta = document.getElementById('blog-html-editor')
    if (!ta) return
    const s = ta.selectionStart
    const e = ta.selectionEnd
    const selected = value.substring(s, e)
    const newVal = value.substring(0, s) + before + selected + after + value.substring(e)
    onChange(newVal)
    setTimeout(() => {
      ta.focus()
      ta.setSelectionRange(s + before.length, s + before.length + selected.length)
    }, 0)
  }

  const insertLink = () => {
    const url = prompt('URL daalo (e.g. /services ya https://...)')
    if (url) insertTag(`<a href="${url}">`, '</a>')
  }

  return (
    <div className="border border-gray-300 rounded-lg overflow-hidden">
      {/* Tab bar */}
      <div className="flex border-b border-gray-200 bg-gray-50">
        <button type="button" onClick={() => setTab('write')}
          className={`px-4 py-2 text-xs font-bold transition-colors ${tab === 'write' ? 'bg-white text-slate-800 border-b-2 border-orange-500' : 'text-slate-500 hover:text-slate-700'}`}>
          ✏️ Write HTML
        </button>
        <button type="button" onClick={() => setTab('preview')}
          className={`px-4 py-2 text-xs font-bold transition-colors ${tab === 'preview' ? 'bg-white text-slate-800 border-b-2 border-orange-500' : 'text-slate-500 hover:text-slate-700'}`}>
          👁 Preview
        </button>
      </div>

      {tab === 'write' && (
        <>
          {/* Toolbar */}
          <div className="flex flex-wrap gap-1 p-2 bg-gray-50 border-b border-gray-200">
            {TOOLBAR_BTNS.map(btn => (
              <button key={btn.label} type="button"
                onClick={() => insertTag(btn.before, btn.after)}
                className="px-2.5 py-1 text-xs font-bold bg-white border border-gray-300 rounded hover:bg-orange-50 hover:border-orange-400 hover:text-orange-600 transition-colors">
                {btn.label}
              </button>
            ))}
            <button type="button" onClick={insertLink}
              className="px-2.5 py-1 text-xs font-bold bg-white border border-gray-300 rounded hover:bg-orange-50 hover:border-orange-400 hover:text-orange-600 transition-colors">
              🔗 Link
            </button>
          </div>
          {/* Textarea */}
          <textarea
            id="blog-html-editor"
            value={value}
            onChange={e => onChange(e.target.value)}
            placeholder="HTML content yahan likho... e.g. <h2>Heading</h2><p>Paragraph text</p>"
            className="w-full px-4 py-3 text-sm font-mono text-slate-700 bg-white outline-none resize-none min-h-[280px]"
          />
        </>
      )}

      {tab === 'preview' && (
        <div
          className="blog-content p-4 min-h-[280px] bg-white text-sm overflow-auto"
          dangerouslySetInnerHTML={{ __html: value || '<p class="text-gray-400">Kuch nahi likha abhi...</p>' }}
        />
      )}
    </div>
  )
}

const AdminBlog = () => {
  const { token } = useAdminAuth()
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [toast, setToast] = useState(null)
  const [activeDropdownId, setActiveDropdownId] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)
  const [currentItem, setCurrentItem] = useState(null)
  const [deleteItemTarget, setDeleteItemTarget] = useState(null)
  const [viewItemTarget, setViewItemTarget] = useState(null)
  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [formValues, setFormValues] = useState({
    title: '', slug: '', category: 'Engineering', author: 'ADVMEN Team',
    date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    readTime: '5 min read', excerpt: '', content: '', image: '', tagsString: '', isActive: true,
  })
  const [formErrors, setFormErrors] = useState({})
  const [isSaving, setIsSaving] = useState(false)

  const fetchBlogData = async () => {
    setLoading(true)
    try {
      const res = await fetch(`${API_BASE_URL}/api/blog/all`, { headers: { Authorization: `Bearer ${token}` } })
      if (res.ok) {
        const data = await res.json()
        if (Array.isArray(data)) setItems(data.map(i => ({ ...i, id: i._id })))
      } else setItems([])
    } catch { setItems([]) } finally { setLoading(false) }
  }

  useEffect(() => { fetchBlogData() }, [])
  useEffect(() => {
    if (toast) { const t = setTimeout(() => setToast(null), 4000); return () => clearTimeout(t) }
  }, [toast])

  const showToast = (message, type = 'success') => setToast({ message, type })

  const uniqueCategories = ['All', ...new Set(items.map(i => i.category))]
  const totalItems = items.length
  const activeItems = items.filter(i => i.isActive !== false).length
  const inactiveItems = totalItems - activeItems

  const handleTitleChange = (e) => {
    const val = e.target.value
    const base = val.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')
    const autoSlug = currentItem ? prev.slug : `${base}-${Date.now().toString(36)}`
    setFormValues(prev => ({ ...prev, title: val, slug: currentItem ? prev.slug : autoSlug }))
  }

  const handleFileChange = async (e) => {
    const file = e.target.files[0]
    if (!file) return
    if (!file.type.startsWith('image/')) { showToast('Valid image select karo.', 'error'); return }
    setUploading(true); setUploadProgress(10)
    const fd = new FormData(); fd.append('file', file)
    try {
      const interval = setInterval(() => setUploadProgress(p => p >= 90 ? 90 : p + 15), 150)
      const res = await fetch(`${API_BASE_URL}/api/media/upload`, { method: 'POST', headers: { Authorization: `Bearer ${token}` }, body: fd })
      clearInterval(interval); setUploadProgress(100)
      if (res.ok) { const d = await res.json(); setFormValues(p => ({ ...p, image: d.url })); showToast('Image uploaded!') }
      else showToast('Upload failed.', 'error')
    } catch { showToast('Upload error.', 'error') }
    finally { setTimeout(() => { setUploading(false); setUploadProgress(0) }, 500) }
  }

  const emptyForm = () => ({
    title: '', slug: '', category: 'Engineering', author: 'ADVMEN Team',
    date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    readTime: '5 min read', excerpt: '', content: '', image: '', tagsString: '', isActive: true,
  })

  const handleOpenAddModal = () => { setCurrentItem(null); setFormValues(emptyForm()); setFormErrors({}); setIsModalOpen(true) }

  const handleOpenEditModal = (item) => {
    setCurrentItem(item)
    setFormValues({
      title: item.title || '', slug: item.slug || '', category: item.category || 'Engineering',
      author: item.author || 'ADVMEN Team', date: item.date || '', readTime: item.readTime || '5 min read',
      excerpt: item.excerpt || '', content: item.content || '', image: item.image || '',
      tagsString: item.tags ? item.tags.join(', ') : '', isActive: item.isActive !== false,
    })
    setFormErrors({}); setIsModalOpen(true)
  }

  const validateForm = () => {
    const errors = {}
    if (!formValues.title?.trim()) errors.title = 'Title required'
    if (!formValues.category?.trim()) errors.category = 'Category required'
    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSaveItem = async () => {
    if (!validateForm()) return
    setIsSaving(true)
    const { tagsString, ...rest } = formValues
    const payload = { ...rest, tags: tagsString ? tagsString.split(',').map(s => s.trim()).filter(Boolean) : [] }
    try {
      const url = currentItem ? `${API_BASE_URL}/api/blog/${currentItem.id}` : `${API_BASE_URL}/api/blog`
      const res = await fetch(url, {
        method: currentItem ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(payload)
      })
      if (res.ok) { showToast(currentItem ? 'Article updated!' : 'Article created!'); setIsModalOpen(false); fetchBlogData() }
      else { const d = await res.json(); console.error('Blog save error:', d); showToast(d.message || 'Save failed', 'error') }
    } catch { showToast('Connection error', 'error') }
    finally { setIsSaving(false) }
  }

  const handleToggleActive = async (item) => {
    setActiveDropdownId(null)
    try {
      const res = await fetch(`${API_BASE_URL}/api/blog/${item.id}/toggle`, { method: 'PATCH', headers: { Authorization: `Bearer ${token}` } })
      if (res.ok) { showToast(`Article ${item.isActive ? 'unpublished' : 'published'}!`); fetchBlogData() }
      else showToast('Toggle failed', 'error')
    } catch { showToast('Connection error', 'error') }
  }

  const confirmDelete = async () => {
    if (!deleteItemTarget) return
    try {
      const res = await fetch(`${API_BASE_URL}/api/blog/${deleteItemTarget.id}`, { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } })
      if (res.ok) { showToast('Article deleted'); fetchBlogData() }
      else showToast('Delete failed', 'error')
    } catch { showToast('Connection error', 'error') }
    finally { setIsDeleteModalOpen(false); setDeleteItemTarget(null) }
  }

  const filteredItems = items.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.excerpt && item.excerpt.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="w-full min-h-screen p-6 sm:p-8 bg-[#f8fafc] text-slate-800 font-sans">

      <AnimatePresence>
        {toast && (
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
            className="fixed top-6 right-6 z-50 flex items-center gap-3 px-5 py-3.5 rounded-xl shadow-lg border"
            style={{ background: toast.type === 'error' ? 'rgba(254,242,242,0.95)' : 'rgba(236,253,245,0.95)', borderColor: toast.type === 'error' ? '#fca5a5' : '#6ee7b7', color: toast.type === 'error' ? '#991b1b' : '#065f46' }}>
            {toast.type === 'error' ? <FiAlertCircle size={18} /> : <FiCheck size={18} />}
            <span className="text-sm font-semibold">{toast.message}</span>
            <button onClick={() => setToast(null)}><FiX size={16} /></button>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight flex items-center gap-3">
              <span className="p-2 rounded-xl bg-orange-50 text-orange-600"><FiFileText size={24} /></span>
              Blog & Article Registry
            </h1>
            <p className="text-sm text-slate-500 font-medium mt-1">Manage published articles, categories, and editorial posts</p>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={fetchBlogData} className="p-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 transition-all shadow-sm">
              <FiRefreshCw size={18} className={loading ? 'animate-spin' : ''} />
            </button>
            <button onClick={handleOpenAddModal} className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#E85D00] hover:bg-[#e05e00] text-white font-bold text-sm shadow-sm transition-all">
              <FiPlus size={18} /> Add Blog Post
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          {[
            { icon: <FiFileText size={22} />, val: totalItems, label: 'Total Articles', sub: 'Editorial database', color: 'bg-orange-50 text-orange-600' },
            { icon: <FiCheckCircle size={22} />, val: activeItems, label: 'Published Posts', sub: 'Live on site', color: 'bg-emerald-50 text-emerald-600' },
            { icon: <FiTag size={22} />, val: uniqueCategories.length - 1, label: 'Categories', sub: 'Topics covered', color: 'bg-blue-50 text-blue-600' },
            { icon: <FiClock size={22} />, val: inactiveItems, label: 'Draft Articles', sub: 'Unpublished', color: 'bg-slate-100 text-slate-600' },
          ].map((s, i) => (
            <div key={i} className="bg-white p-5 rounded-2xl border border-slate-100 shadow-[0_2px_12px_rgba(0,0,0,0.03)] flex items-center gap-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${s.color}`}>{s.icon}</div>
              <div>
                <div className="text-2xl font-bold text-slate-900">{s.val}</div>
                <div className="text-xs font-bold text-slate-700">{s.label}</div>
                <div className="text-[10px] text-slate-400 font-medium">{s.sub}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-[0_2px_12px_rgba(0,0,0,0.03)] mb-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="relative w-full sm:max-w-sm">
            <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input type="text" placeholder="Search title, category..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium text-slate-700 placeholder-slate-400 focus:bg-white focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none transition-all" />
          </div>
          <div className="flex gap-2 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 [scrollbar-width:none]">
            {uniqueCategories.map(cat => (
              <button key={cat} onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all border ${selectedCategory === cat ? 'bg-orange-500 text-white border-orange-500' : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'}`}>
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-100 shadow-[0_2px_12px_rgba(0,0,0,0.03)] overflow-hidden min-h-[420px]">
          <div className="overflow-x-auto">
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="w-8 h-8 border-2 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : filteredItems.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-64 text-slate-400">
                <FiFileText size={36} className="mb-3 text-slate-300" />
                <p className="text-sm font-semibold text-slate-500">No blog articles found</p>
              </div>
            ) : (
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-100 bg-white">
                    <th className="px-4 py-3.5 text-[11px] font-bold text-slate-400 uppercase tracking-wider w-12 text-center">#</th>
                    <th className="px-4 py-3.5 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Article / Title</th>
                    <th className="px-4 py-3.5 text-[11px] font-bold text-slate-400 uppercase tracking-wider w-32">Category</th>
                    <th className="px-4 py-3.5 text-[11px] font-bold text-slate-400 uppercase tracking-wider w-40">Author / Date</th>
                    <th className="px-4 py-3.5 text-[11px] font-bold text-slate-400 uppercase tracking-wider w-28">Status</th>
                    <th className="px-4 py-3.5 text-[11px] font-bold text-slate-400 uppercase tracking-wider w-20 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredItems.map((item, idx) => (
                    <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="px-4 py-3.5 align-middle text-xs font-semibold text-slate-400 text-center">{idx + 1}</td>
                      <td className="px-4 py-3.5 align-middle">
                        <div className="flex items-center gap-3">
                          {item.image ? (
                            <img src={getImageUrl(item.image) || item.image} alt={item.title} className="w-10 h-10 rounded-xl object-cover border border-slate-200 shadow-sm flex-shrink-0" />
                          ) : (
                            <div className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-400 flex-shrink-0"><FiFileText size={18} /></div>
                          )}
                          <div className="flex flex-col min-w-0">
                            <div className="font-bold text-sm text-slate-800 truncate max-w-[220px]">{item.title}</div>
                            <div className="text-[11px] text-slate-400 font-mono truncate max-w-[200px]">{item.slug}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3.5 align-middle">
                        <span className="inline-flex px-3 py-1 rounded-full text-xs font-semibold bg-orange-50 text-orange-600 border border-orange-100 whitespace-nowrap">{item.category}</span>
                      </td>
                      <td className="px-4 py-3.5 align-middle text-xs text-slate-600 font-medium">
                        <div className="flex items-center gap-1.5 text-slate-700 font-bold"><FiUser size={13} className="text-orange-500" /><span className="truncate max-w-[120px]">{item.author || 'ADVMEN Team'}</span></div>
                        <div className="flex items-center gap-1 text-[11px] text-slate-400 mt-0.5"><FiCalendar size={11} /><span>{item.date || 'Recent'}</span><span>•</span><span>{item.readTime || '5 min'}</span></div>
                      </td>
                      <td className="px-4 py-3.5 align-middle">
                        {item.isActive !== false ? (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-600 border border-emerald-100 whitespace-nowrap"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>Published</span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-500 border border-slate-200 whitespace-nowrap"><span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span>Draft</span>
                        )}
                      </td>
                      <td className="px-4 py-3.5 align-middle text-right relative">
                        <div className="flex justify-end">
                          <button onClick={() => setActiveDropdownId(activeDropdownId === item.id ? null : item.id)}
                            className="p-2 rounded-xl border border-slate-200 bg-white text-slate-500 hover:text-slate-900 hover:bg-slate-50 transition-all shadow-sm cursor-pointer">
                            <FiSettings size={16} />
                          </button>
                        </div>
                        <AnimatePresence>
                          {activeDropdownId === item.id && (
                            <>
                              <div className="fixed inset-0 z-30" onClick={() => setActiveDropdownId(null)} />
                              <motion.div initial={{ opacity: 0, scale: 0.95, y: 5 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 5 }}
                                className="absolute right-6 mt-2 w-44 z-40 p-1.5 bg-white border border-slate-100 rounded-xl shadow-xl text-left">
                                <button onClick={() => { setActiveDropdownId(null); setViewItemTarget(item); setIsViewModalOpen(true) }}
                                  className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 rounded-lg transition-colors cursor-pointer">
                                  <FiEye size={14} className="text-slate-400" />View Details
                                </button>
                                <button onClick={() => { setActiveDropdownId(null); handleOpenEditModal(item) }}
                                  className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 rounded-lg transition-colors cursor-pointer">
                                  <FiEdit2 size={14} className="text-slate-400" />Edit Article
                                </button>
                                <button onClick={() => handleToggleActive(item)}
                                  className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 rounded-lg transition-colors cursor-pointer">
                                  {item.isActive !== false ? <><FiXCircle size={14} className="text-amber-500" /><span>Un-publish</span></> : <><FiCheckCircle size={14} className="text-emerald-500" /><span>Publish</span></>}
                                </button>
                                <div className="my-1 border-t border-slate-100"></div>
                                <button onClick={() => { setActiveDropdownId(null); setDeleteItemTarget(item); setIsDeleteModalOpen(true) }}
                                  className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer">
                                  <FiTrash2 size={14} className="text-red-500" />Delete Article
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
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-[24px] shadow-2xl relative bg-white text-slate-800 [scrollbar-width:none]">
              <div className="sticky top-0 z-10 flex justify-between items-center px-6 py-5 bg-white border-b border-gray-100 rounded-t-[24px]">
                <h3 className="text-xl font-bold text-slate-800">{currentItem ? 'Edit Blog Article' : 'Add New Blog Article'}</h3>
                <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-700"><FiX size={22} /></button>
              </div>

              <div className="px-6 py-6 space-y-5">
                <div>
                  <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1.5">Article Title *</label>
                  <input type="text" placeholder="e.g. Why Every Business Needs a Website in 2025" value={formValues.title} onChange={handleTitleChange}
                    className={`w-full px-4 py-2.5 rounded-lg text-sm bg-white border ${formErrors.title ? 'border-red-500' : 'border-gray-300'} outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all`} />
                  {formErrors.title && <span className="text-[10px] text-red-500">{formErrors.title}</span>}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1.5">URL Slug</label>
                    <input type="text" value={formValues.slug} onChange={e => setFormValues({ ...formValues, slug: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-lg text-sm bg-white border border-gray-300 outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all font-mono" />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1.5">Category *</label>
                    <select value={formValues.category} onChange={e => setFormValues({ ...formValues, category: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-lg text-sm bg-white border border-gray-300 outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all">
                      <option>Engineering</option>
                      <option>React Development</option>
                      <option>Design Trends</option>
                      <option>SEO Strategy</option>
                      <option>Case Study</option>
                      <option>Digital Marketing</option>
                      <option>Business Growth</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1.5">Featured Image</label>
                  <div className="flex items-center gap-3">
                    <label className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 cursor-pointer transition-all text-xs font-semibold text-gray-600">
                      <FiUploadCloud size={18} className="text-gray-500" />
                      <span>{uploading ? `Uploading (${uploadProgress}%)...` : (formValues.image ? 'Change Image' : 'Upload Featured Image')}</span>
                      <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} disabled={uploading} />
                    </label>
                    {formValues.image && (
                      <div className="relative w-12 h-12 flex-shrink-0">
                        <img src={formValues.image} alt="Preview" className="w-12 h-12 object-cover rounded-lg border border-gray-200" />
                        <button type="button" onClick={() => setFormValues({ ...formValues, image: '' })}
                          className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-red-500 text-white flex items-center justify-center hover:bg-red-600">
                          <FiX size={12} />
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1.5">Author Name</label>
                    <input type="text" value={formValues.author} onChange={e => setFormValues({ ...formValues, author: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-lg text-sm bg-white border border-gray-300 outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all" />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1.5">Read Time</label>
                    <input type="text" value={formValues.readTime} onChange={e => setFormValues({ ...formValues, readTime: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-lg text-sm bg-white border border-gray-300 outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all" />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1.5">Tags (Comma-Separated)</label>
                  <input type="text" placeholder="e.g. SEO, Business, Website" value={formValues.tagsString} onChange={e => setFormValues({ ...formValues, tagsString: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg text-sm bg-white border border-gray-300 outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all" />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1.5">Excerpt (Short Summary)</label>
                  <textarea placeholder="Blog card pe dikhne wala short description..." value={formValues.excerpt} onChange={e => setFormValues({ ...formValues, excerpt: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg text-sm bg-white border border-gray-300 outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all h-20 resize-none" />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1.5">
                    Full Article Content
                    <span className="ml-2 text-orange-500 normal-case font-normal">— toolbar se H2, Bold, Link buttons use karo</span>
                  </label>
                  <HtmlEditor value={formValues.content} onChange={val => setFormValues(prev => ({ ...prev, content: val }))} />
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <input type="checkbox" id="isActive" checked={formValues.isActive} onChange={e => setFormValues({ ...formValues, isActive: e.target.checked })}
                    className="w-4 h-4 text-green-600 rounded border-gray-300 focus:ring-green-500" />
                  <label htmlFor="isActive" className="text-[11px] font-bold text-gray-500 uppercase cursor-pointer">Published / Active</label>
                </div>
              </div>

              <div className="sticky bottom-0 px-6 py-4 border-t border-gray-100 flex justify-end gap-3 bg-white rounded-b-[24px]">
                <button onClick={() => setIsModalOpen(false)} disabled={isSaving}
                  className="px-5 py-2 rounded-lg text-sm font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200 transition-colors">Cancel</button>
                <button onClick={handleSaveItem} disabled={isSaving}
                  className="px-6 py-2 rounded-lg text-sm font-bold bg-[#0f172a] text-white hover:bg-[#1e293b] transition-all flex items-center justify-center min-w-[120px] shadow-md">
                  {isSaving ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div> : 'Save Article'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* View Modal */}
      <AnimatePresence>
        {isViewModalOpen && viewItemTarget && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-[24px] shadow-2xl bg-white text-slate-800 [scrollbar-width:none]">
              <div className="sticky top-0 z-10 flex justify-between items-center px-6 py-5 bg-white border-b border-gray-100 rounded-t-[24px]">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-orange-600 bg-orange-50 px-2.5 py-0.5 rounded-full border border-orange-100">{viewItemTarget.category}</span>
                  <h3 className="text-xl font-bold text-slate-800 mt-1">{viewItemTarget.title}</h3>
                </div>
                <button onClick={() => setIsViewModalOpen(false)} className="text-gray-400 hover:text-gray-700 p-1"><FiX size={22} /></button>
              </div>
              <div className="p-6 space-y-4">
                {viewItemTarget.image && <div className="w-full h-44 rounded-xl overflow-hidden border border-slate-200"><img src={getImageUrl(viewItemTarget.image) || viewItemTarget.image} alt={viewItemTarget.title} className="w-full h-full object-cover" /></div>}
                <div className="grid grid-cols-2 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-100">
                  <div><span className="text-[10px] font-bold uppercase text-slate-400 block">Author</span><span className="text-xs font-semibold text-slate-700">{viewItemTarget.author}</span></div>
                  <div><span className="text-[10px] font-bold uppercase text-slate-400 block">Date / Read Time</span><span className="text-xs font-semibold text-slate-700">{viewItemTarget.date} ({viewItemTarget.readTime})</span></div>
                  <div><span className="text-[10px] font-bold uppercase text-slate-400 block">Slug</span><span className="text-xs font-mono text-slate-700">{viewItemTarget.slug}</span></div>
                  <div><span className="text-[10px] font-bold uppercase text-slate-400 block">Status</span><span className={`text-xs font-bold ${viewItemTarget.isActive !== false ? 'text-emerald-600' : 'text-slate-500'}`}>{viewItemTarget.isActive !== false ? '● Published' : '○ Draft'}</span></div>
                </div>
                {viewItemTarget.excerpt && <div><span className="text-[10px] font-bold uppercase text-slate-400 block mb-1">Excerpt</span><p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-lg border border-slate-100">{viewItemTarget.excerpt}</p></div>}
                {viewItemTarget.content && (
                  <div>
                    <span className="text-[10px] font-bold uppercase text-slate-400 block mb-1">Content Preview</span>
                    <div className="blog-content text-xs bg-slate-50 p-4 rounded-lg border border-slate-100 max-h-48 overflow-y-auto" dangerouslySetInnerHTML={{ __html: viewItemTarget.content }} />
                  </div>
                )}
              </div>
              <div className="sticky bottom-0 px-6 py-4 border-t border-gray-100 flex justify-end bg-white rounded-b-[24px]">
                <button onClick={() => setIsViewModalOpen(false)} className="px-5 py-2 rounded-lg text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors">Close</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Delete Modal */}
      <AnimatePresence>
        {isDeleteModalOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60">
            <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }}
              className="w-full max-w-sm rounded-2xl p-6 border shadow-2xl text-center bg-white">
              <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto mb-4"><FiTrash2 size={24} /></div>
              <h3 className="text-lg font-bold text-slate-800 mb-2">Delete Blog Article?</h3>
              <p className="text-sm text-slate-500 mb-6">Are you sure you want to delete <strong className="text-slate-800">"{deleteItemTarget?.title}"</strong>?</p>
              <div className="flex gap-3">
                <button onClick={() => setIsDeleteModalOpen(false)} className="flex-1 py-2 rounded-xl text-sm font-semibold border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 transition-colors">Cancel</button>
                <button onClick={confirmDelete} className="flex-1 py-2 rounded-xl text-sm font-bold bg-red-600 text-white hover:bg-red-700 transition-colors">Delete</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  )
}

export default AdminBlog
