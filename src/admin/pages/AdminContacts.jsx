/**
 * admin/pages/AdminContacts.jsx
 * ─────────────────────────────────────────────────────────────
 * ADVMEN Technologies — Admin Contacts & Inquiries Management (Industrial Light Theme)
 * ─────────────────────────────────────────────────────────────
 */

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  FiMail, 
  FiTrash2, 
  FiX, 
  FiCheck, 
  FiAlertCircle,
  FiSearch,
  FiClock,
  FiRefreshCw,
  FiSettings,
  FiEye,
  FiUser,
  FiStar,
  FiPhone,
  FiCalendar,
  FiCheckCircle,
  FiDollarSign,
  FiBriefcase
} from 'react-icons/fi'
import { useAdminAuth } from '@/admin/context/AdminAuthContext'
import { API_BASE_URL } from '@utils/constants'

const AdminContacts = () => {
  const { token } = useAdminAuth()
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedFilter, setSelectedFilter] = useState('All')

  // Notification Toast State
  const [toast, setToast] = useState(null)

  // Dropdown state
  const [activeDropdownId, setActiveDropdownId] = useState(null)

  // Modals state
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)
  
  const [deleteItemTarget, setDeleteItemTarget] = useState(null)
  const [viewItemTarget, setViewItemTarget] = useState(null)

  const fetchContactsData = async () => {
    setLoading(true)
    try {
      const response = await fetch(`${API_BASE_URL}/api/contact`, {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      if (response.ok) {
        const result = await response.json()
        const data = result.data || result
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
    fetchContactsData()
  }, [])

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 4000)
      return () => clearTimeout(timer)
    }
  }, [toast])

  const showToast = (message, type = 'success') => setToast({ message, type })

  const totalItems = items.length
  const newItems = items.filter(item => item.status === 'New' || !item.status).length
  const starredItems = items.filter(item => item.isStarred).length
  const repliedItems = items.filter(item => item.status === 'Replied').length

  const handleUpdateStatus = async (item, newStatus) => {
    setActiveDropdownId(null)
    try {
      const res = await fetch(`${API_BASE_URL}/api/contact/${item.id}/status`, {
        method: 'PATCH',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` 
        },
        body: JSON.stringify({ status: newStatus })
      })
      if (res.ok) {
        showToast(`Inquiry marked as ${newStatus}`)
        fetchContactsData()
      } else {
        showToast('Failed to update status', 'error')
      }
    } catch (err) {
      showToast('Connection error', 'error')
    }
  }

  const handleToggleStar = async (item) => {
    setActiveDropdownId(null)
    try {
      const res = await fetch(`${API_BASE_URL}/api/contact/${item.id}/star`, {
        method: 'PATCH',
        headers: { 'Authorization': `Bearer ${token}` }
      })
      if (res.ok) {
        showToast(`Inquiry ${item.isStarred ? 'unstarred' : 'starred'}`)
        fetchContactsData()
      } else {
        showToast('Failed to toggle star', 'error')
      }
    } catch (err) {
      showToast('Connection error', 'error')
    }
  }

  const confirmDelete = async () => {
    if (!deleteItemTarget) return
    try {
      const res = await fetch(`${API_BASE_URL}/api/contact/${deleteItemTarget.id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      })
      if (res.ok) {
        showToast('Inquiry deleted successfully')
        fetchContactsData()
      } else {
        showToast('Failed to delete inquiry', 'error')
      }
    } catch (err) {
      showToast('Connection error', 'error')
    } finally {
      setIsDeleteModalOpen(false)
      setDeleteItemTarget(null)
    }
  }

  const filteredItems = items.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          item.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (item.subject && item.subject.toLowerCase().includes(searchTerm.toLowerCase())) ||
                          (item.message && item.message.toLowerCase().includes(searchTerm.toLowerCase()))
    
    if (selectedFilter === 'New') return matchesSearch && (item.status === 'New' || !item.status)
    if (selectedFilter === 'Starred') return matchesSearch && item.isStarred
    if (selectedFilter === 'Read') return matchesSearch && item.status === 'Read'
    if (selectedFilter === 'Replied') return matchesSearch && item.status === 'Replied'
    return matchesSearch
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
                <FiMail size={24} />
              </span>
              Contacts Registry
            </h1>
            <p className="text-sm text-slate-500 font-medium mt-1">
              View and manage incoming client project inquiries & lead messages
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <button 
              onClick={fetchContactsData}
              className="p-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 transition-all shadow-sm flex items-center gap-2 text-xs font-bold"
              title="Refresh Registry"
            >
              <FiRefreshCw size={16} className={loading ? 'animate-spin' : ''} />
              <span>Refresh Inquiries</span>
            </button>
          </div>
        </div>

        {/* 4 Stat Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          
          {/* Stat 1 */}
          <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-[0_2px_12px_rgba(0,0,0,0.03)] flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center flex-shrink-0">
              <FiMail size={22} />
            </div>
            <div>
              <div className="text-2xl font-bold text-slate-900">{totalItems}</div>
              <div className="text-xs font-bold text-slate-700">Total Inquiries</div>
              <div className="text-[10px] text-slate-400 font-medium">All submissions</div>
            </div>
          </div>

          {/* Stat 2 */}
          <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-[0_2px_12px_rgba(0,0,0,0.03)] flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0">
              <FiAlertCircle size={22} />
            </div>
            <div>
              <div className="text-2xl font-bold text-slate-900">{newItems}</div>
              <div className="text-xs font-bold text-slate-700">New Inquiries</div>
              <div className="text-[10px] text-slate-400 font-medium">Action required</div>
            </div>
          </div>

          {/* Stat 3 */}
          <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-[0_2px_12px_rgba(0,0,0,0.03)] flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-500 flex items-center justify-center flex-shrink-0">
              <FiStar size={22} />
            </div>
            <div>
              <div className="text-2xl font-bold text-slate-900">{starredItems}</div>
              <div className="text-xs font-bold text-slate-700">Starred Leads</div>
              <div className="text-[10px] text-slate-400 font-medium">High priority</div>
            </div>
          </div>

          {/* Stat 4 */}
          <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-[0_2px_12px_rgba(0,0,0,0.03)] flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0">
              <FiCheckCircle size={22} />
            </div>
            <div>
              <div className="text-2xl font-bold text-slate-900">{repliedItems}</div>
              <div className="text-xs font-bold text-slate-700">Replied Leads</div>
              <div className="text-[10px] text-slate-400 font-medium">Processed</div>
            </div>
          </div>

        </div>

        {/* Filter Bar */}
        <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-[0_2px_12px_rgba(0,0,0,0.03)] mb-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          
          {/* Search Input */}
          <div className="relative w-full sm:max-w-sm">
            <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input
              type="text"
              placeholder="Search name, email, subject, message..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium text-slate-700 placeholder-slate-400 focus:bg-white focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none transition-all"
            />
          </div>

          {/* Status Filter Pills */}
          <div className="flex gap-2 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {['All', 'New', 'Starred', 'Read', 'Replied'].map(status => (
              <button
                key={status}
                onClick={() => setSelectedFilter(status)}
                className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all border ${
                  selectedFilter === status
                    ? 'bg-orange-500 text-white border-orange-500 shadow-sm'
                    : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                }`}
              >
                {status}
              </button>
            ))}
          </div>

        </div>

        {/* Main Contacts Table Card */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-[0_2px_12px_rgba(0,0,0,0.03)] overflow-hidden min-h-[420px]">
          
          <div className="overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="w-8 h-8 border-2 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : filteredItems.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-64 text-slate-400">
                <FiMail size={36} className="mb-3 text-slate-300" />
                <p className="text-sm font-semibold text-slate-500">No contact inquiries found</p>
                <p className="text-xs text-slate-400 mt-1">Inquiries submitted via the Contact Us form will appear here live</p>
              </div>
            ) : (
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-100 bg-white">
                    <th className="px-4 py-3.5 text-[11px] font-bold text-slate-400 uppercase tracking-wider w-12 text-center">#</th>
                    <th className="px-4 py-3.5 text-[11px] font-bold text-slate-400 uppercase tracking-wider w-24">ID</th>
                    <th className="px-4 py-3.5 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Client / Contact</th>
                    <th className="px-4 py-3.5 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Subject / Project</th>
                    <th className="px-4 py-3.5 text-[11px] font-bold text-slate-400 uppercase tracking-wider w-40">Budget / Timeline</th>
                    <th className="px-4 py-3.5 text-[11px] font-bold text-slate-400 uppercase tracking-wider w-28">Status</th>
                    <th className="px-4 py-3.5 text-[11px] font-bold text-slate-400 uppercase tracking-wider w-20 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredItems.map((item, idx) => (
                    <tr key={item.id} className={`hover:bg-slate-50/80 transition-colors ${item.status === 'New' || !item.status ? 'bg-orange-50/30' : ''}`}>
                      
                      {/* Index */}
                      <td className="px-4 py-3.5 align-middle text-xs font-semibold text-slate-400 text-center">
                        <div className="flex items-center justify-center gap-1">
                          {item.isStarred && <FiStar size={12} className="text-amber-500 fill-amber-500" />}
                          <span>{idx + 1}</span>
                        </div>
                      </td>

                      {/* ID */}
                      <td className="px-4 py-3.5 align-middle text-xs font-mono font-bold text-slate-700">
                        INQ{String(idx + 101).padStart(4, '0')}
                      </td>

                      {/* Client / Contact */}
                      <td className="px-4 py-3.5 align-middle">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-orange-100 text-orange-600 font-bold flex items-center justify-center text-sm flex-shrink-0 border border-orange-200 uppercase">
                            {item.name ? item.name.charAt(0) : 'C'}
                          </div>
                          <div className="flex flex-col justify-center min-w-0">
                            <div className="font-bold text-sm text-slate-800 leading-snug truncate max-w-[180px]" title={item.name}>{item.name}</div>
                            <div className="text-[11px] text-slate-500 font-medium truncate max-w-[180px]" title={item.email}>{item.email}</div>
                          </div>
                        </div>
                      </td>

                      {/* Subject / Project */}
                      <td className="px-4 py-3.5 align-middle">
                        <div className="flex flex-col justify-center min-w-0">
                          <div className="font-bold text-sm text-slate-800 leading-snug truncate max-w-[200px]" title={item.subject || 'General Inquiry'}>
                            {item.subject || 'General Project Inquiry'}
                          </div>
                          {item.industry && (
                            <span className="text-[10px] font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-100 w-fit mt-0.5">
                              {item.industry}
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Budget / Timeline */}
                      <td className="px-4 py-3.5 align-middle text-xs text-slate-600 font-medium">
                        <div className="font-bold text-slate-800 text-xs flex items-center gap-1">
                          <FiDollarSign size={13} className="text-emerald-500 flex-shrink-0" />
                          <span>{item.budget || 'Not specified'}</span>
                        </div>
                        <div className="text-[11px] text-slate-400 mt-0.5 pl-4">{item.timeline || 'Flexible'}</div>
                      </td>

                      {/* Status Badge */}
                      <td className="px-4 py-3.5 align-middle">
                        {item.status === 'New' || !item.status ? (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-600 border border-emerald-100 whitespace-nowrap">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                            New
                          </span>
                        ) : item.status === 'Replied' ? (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-600 border border-blue-100 whitespace-nowrap">
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                            Replied
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-600 border border-slate-200 whitespace-nowrap">
                            <span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span>
                            Read
                          </span>
                        )}
                      </td>

                      {/* Gear Icon Dropdown Actions */}
                      <td className="px-4 py-3.5 align-middle text-right relative">
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
                                className="absolute right-6 mt-2 w-48 z-40 p-1.5 bg-white border border-slate-100 rounded-xl shadow-xl text-left"
                              >
                                <button
                                  onClick={() => { 
                                    setActiveDropdownId(null); 
                                    setViewItemTarget(item); 
                                    setIsViewModalOpen(true);
                                    if (item.status === 'New' || !item.status) {
                                      handleUpdateStatus(item, 'Read')
                                    }
                                  }}
                                  className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 rounded-lg transition-colors cursor-pointer"
                                >
                                  <FiEye size={14} className="text-slate-400" />
                                  View Message
                                </button>
                                
                                <button
                                  onClick={() => handleToggleStar(item)}
                                  className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 rounded-lg transition-colors cursor-pointer"
                                >
                                  <FiStar size={14} className={item.isStarred ? 'text-amber-500 fill-amber-500' : 'text-slate-400'} />
                                  {item.isStarred ? 'Unstar Lead' : 'Star Lead'}
                                </button>

                                <button
                                  onClick={() => handleUpdateStatus(item, item.status === 'Replied' ? 'Read' : 'Replied')}
                                  className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 rounded-lg transition-colors cursor-pointer"
                                >
                                  <FiCheckCircle size={14} className="text-emerald-500" />
                                  {item.status === 'Replied' ? 'Mark Unreplied' : 'Mark Replied'}
                                </button>

                                <div className="my-1 border-t border-slate-100"></div>
                                
                                <button
                                  onClick={() => { setActiveDropdownId(null); setDeleteItemTarget(item); setIsDeleteModalOpen(true); }}
                                  className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                                >
                                  <FiTrash2 size={14} className="text-red-500" />
                                  Delete Inquiry
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

      {/* View Message Details Modal */}
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
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-orange-100 text-orange-600 font-bold flex items-center justify-center text-sm border border-orange-200 uppercase">
                    {viewItemTarget.name ? viewItemTarget.name.charAt(0) : 'C'}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold font-display text-slate-800 leading-snug">
                      {viewItemTarget.name}
                    </h3>
                    <p className="text-xs text-slate-500 font-medium">{viewItemTarget.email}</p>
                  </div>
                </div>
                <button onClick={() => setIsViewModalOpen(false)} className="text-gray-400 hover:text-gray-700 transition-colors p-1">
                  <FiX size={22} />
                </button>
              </div>

              <div className="p-6 space-y-5">
                
                {/* Meta Grid */}
                <div className="grid grid-cols-2 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-100">
                  <div>
                    <span className="text-[10px] font-bold uppercase text-slate-400 block">Phone</span>
                    <span className="text-xs font-semibold text-slate-700">{viewItemTarget.phone || 'Not provided'}</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase text-slate-400 block">Subject / Title</span>
                    <span className="text-xs font-semibold text-slate-700">{viewItemTarget.subject || 'General Inquiry'}</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase text-slate-400 block">Budget Range</span>
                    <span className="text-xs font-bold text-emerald-600">{viewItemTarget.budget || 'Not specified'}</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase text-slate-400 block">Project Timeline</span>
                    <span className="text-xs font-semibold text-slate-700">{viewItemTarget.timeline || 'Flexible'}</span>
                  </div>
                  {viewItemTarget.industry && (
                    <div>
                      <span className="text-[10px] font-bold uppercase text-slate-400 block">Industry</span>
                      <span className="text-xs font-semibold text-slate-700">{viewItemTarget.industry}</span>
                    </div>
                  )}
                  {viewItemTarget.projectType && (
                    <div>
                      <span className="text-[10px] font-bold uppercase text-slate-400 block">Project Type</span>
                      <span className="text-xs font-semibold text-slate-700">{viewItemTarget.projectType}</span>
                    </div>
                  )}
                </div>

                {viewItemTarget.goals && (
                  <div>
                    <span className="text-[10px] font-bold uppercase text-slate-400 block mb-1">Project Goals</span>
                    <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-lg border border-slate-100">
                      {viewItemTarget.goals}
                    </p>
                  </div>
                )}

                <div>
                  <span className="text-[10px] font-bold uppercase text-slate-400 block mb-1">Full Message</span>
                  <div className="text-xs text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-lg border border-slate-100 whitespace-pre-wrap font-sans">
                    {viewItemTarget.message}
                  </div>
                </div>

              </div>

              <div className="sticky bottom-0 px-6 py-4 border-t border-gray-100 flex justify-between items-center bg-white rounded-b-[24px]">
                <a
                  href={`mailto:${viewItemTarget.email}?subject=Re: ${encodeURIComponent(viewItemTarget.subject || 'ADVMEN Inquiry')}`}
                  className="px-5 py-2 rounded-lg text-xs font-bold bg-[#ff6b00] text-white hover:bg-[#e05e00] transition-all flex items-center gap-2 shadow-sm"
                >
                  <FiMail size={14} /> Reply via Email
                </a>
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
              <h3 className="text-lg font-bold text-slate-800 mb-2">Delete Inquiry?</h3>
              <p className="text-sm text-slate-500 mb-6">
                Are you sure you want to delete inquiry from <strong className="text-slate-800">"{deleteItemTarget?.name}"</strong>? This action cannot be undone.
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

export default AdminContacts
