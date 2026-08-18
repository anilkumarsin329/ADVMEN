/**
 * admin/pages/AdminApplications.jsx
 * ─────────────────────────────────────────────────────────────
 * ADVMEN Technologies — Admin Job Applications Dashboard
 * ─────────────────────────────────────────────────────────────
 */

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  FiUsers, 
  FiSearch, 
  FiTrash2, 
  FiX, 
  FiCheck, 
  FiAlertCircle, 
  FiClock, 
  FiRefreshCw, 
  FiSettings, 
  FiEye, 
  FiStar, 
  FiMail, 
  FiPhone, 
  FiExternalLink, 
  FiAward, 
  FiBriefcase,
  FiFileText,
  FiCheckCircle,
  FiXCircle
} from 'react-icons/fi'
import { useAdminAuth } from '@/admin/context/AdminAuthContext'

const AdminApplications = () => {
  const { token } = useAdminAuth()
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedFilter, setSelectedFilter] = useState('All') // 'All', 'Pending', 'Shortlisted', 'Internships', 'Full-Time'

  const [toast, setToast] = useState(null)
  const [activeDropdownId, setActiveDropdownId] = useState(null)

  const [isViewModalOpen, setIsViewModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [targetItem, setTargetItem] = useState(null)

  const fetchApplications = async () => {
    setLoading(true)
    try {
      const res = await fetch('http://localhost:5000/api/applications', {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      if (res.ok) {
        const result = await res.json()
        const data = result.data || result
        if (Array.isArray(data)) {
          setItems(data.map(item => ({ ...item, id: item._id || item.id })))
        }
      } else {
        setItems([])
      }
    } catch (err) {
      console.warn('Applications fetch error:', err)
      setItems([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchApplications()
  }, [])

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 4000)
      return () => clearTimeout(timer)
    }
  }, [toast])

  const showToast = (message, type = 'success') => setToast({ message, type })

  // Stats calculation
  const totalCount = items.length
  const internCount = items.filter(i => (i.jobType || '').toLowerCase().includes('intern')).length
  const fullTimeCount = totalCount - internCount
  const shortlistedCount = items.filter(i => i.status === 'Shortlisted').length

  // Filtered List
  const filteredItems = items.filter((item) => {
    const matchesSearch = 
      item.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.jobTitle?.toLowerCase().includes(searchTerm.toLowerCase())

    if (!matchesSearch) return false

    if (selectedFilter === 'All') return true
    if (selectedFilter === 'Internships') return (item.jobType || '').toLowerCase().includes('intern')
    if (selectedFilter === 'Full-Time') return !(item.jobType || '').toLowerCase().includes('intern')
    return item.status === selectedFilter
  })

  // Handlers
  const handleUpdateStatus = async (item, newStatus) => {
    setActiveDropdownId(null)
    try {
      const res = await fetch(`http://localhost:5000/api/applications/${item.id}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status: newStatus })
      })
      if (res.ok) {
        showToast(`Status updated to ${newStatus}`)
        fetchApplications()
      } else {
        showToast('Failed to update status', 'error')
      }
    } catch (err) {
      showToast('API Connection Error', 'error')
    }
  }

  const handleToggleStar = async (item) => {
    setActiveDropdownId(null)
    try {
      const res = await fetch(`http://localhost:5000/api/applications/${item.id}/star`, {
        method: 'PATCH',
        headers: { 'Authorization': `Bearer ${token}` }
      })
      if (res.ok) {
        showToast(item.isStarred ? 'Unstarred candidate' : 'Starred candidate')
        fetchApplications()
      }
    } catch (err) {
      showToast('API Error', 'error')
    }
  }

  const handleDelete = async () => {
    if (!targetItem) return
    try {
      const res = await fetch(`http://localhost:5000/api/applications/${targetItem.id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      })
      if (res.ok) {
        showToast('Application deleted successfully!')
        setIsDeleteModalOpen(false)
        fetchApplications()
      } else {
        showToast('Failed to delete application', 'error')
      }
    } catch (err) {
      showToast('API Connection Error', 'error')
    }
  }

  return (
    <div className="w-full flex flex-col gap-8 text-slate-800 font-sans">
      
      {/* Toast Notification */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`fixed top-6 right-6 z-50 px-5 py-3 rounded-xl shadow-xl flex items-center gap-3 text-xs font-bold text-white ${toast.type === 'error' ? 'bg-red-600' : 'bg-emerald-600'}`}
          >
            {toast.type === 'error' ? <FiAlertCircle size={16} /> : <FiCheck size={16} />}
            <span>{toast.message}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight flex items-center gap-3">
            <span className="p-2 rounded-xl bg-orange-50 text-orange-600">
              <FiUsers size={24} />
            </span>
            Job Applications
          </h2>
          <p className="text-xs font-medium text-slate-500 mt-1">
            Manage candidates applying for Internship & Experienced roles
          </p>
        </div>

        <button
          onClick={fetchApplications}
          className="p-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 transition-all shadow-sm flex items-center gap-2 text-xs font-bold self-start sm:self-auto"
        >
          <FiRefreshCw size={16} className={loading ? 'animate-spin' : ''} />
          <span>Refresh Data</span>
        </button>
      </div>

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Total Applications', count: totalCount, icon: FiUsers, color: 'text-orange-600 bg-orange-50' },
          { label: 'Internship Applications', count: internCount, icon: FiAward, color: 'text-amber-600 bg-amber-50' },
          { label: 'Full-Time Applications', count: fullTimeCount, icon: FiBriefcase, color: 'text-blue-600 bg-blue-50' },
          { label: 'Shortlisted Candidates', count: shortlistedCount, icon: FiCheckCircle, color: 'text-emerald-600 bg-emerald-50' },
        ].map((card, idx) => {
          const Icon = card.icon
          return (
            <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex justify-between items-center">
              <div>
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">{card.label}</span>
                <span className="text-3xl font-bold text-slate-900 block mt-1">{loading ? '...' : card.count}</span>
              </div>
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl ${card.color}`}>
                <Icon />
              </div>
            </div>
          )
        })}
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Search */}
        <div className="relative w-full md:w-80">
          <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
          <input
            type="text"
            placeholder="Search by name, email, role..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl text-xs bg-slate-50 border border-slate-200 outline-none focus:border-orange-500 focus:bg-white transition-all"
          />
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-2 w-full md:w-auto">
          {['All', 'Pending', 'Shortlisted', 'Rejected', 'Internships', 'Full-Time'].map((filter) => (
            <button
              key={filter}
              onClick={() => setSelectedFilter(filter)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                selectedFilter === filter
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

      </div>

      {/* Table Container */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden min-h-[400px]">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="w-8 h-8 border-3 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-slate-400">
            <FiUsers size={36} className="mb-2 text-slate-300" />
            <p className="text-xs font-semibold text-slate-500">No job applications found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-100 text-[11px] font-bold text-slate-400 uppercase tracking-wider bg-slate-50/50">
                  <th className="py-3.5 px-4 w-12 text-center">S.No.</th>
                  <th className="py-3.5 px-4">Candidate</th>
                  <th className="py-3.5 px-4">Applied Role & Track</th>
                  <th className="py-3.5 px-4">Contact Info</th>
                  <th className="py-3.5 px-4">Applied Date</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredItems.map((item, index) => {
                  const isIntern = (item.jobType || '').toLowerCase().includes('intern')
                  return (
                    <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                      
                      {/* S.No. */}
                      <td className="py-3.5 px-4 text-center font-mono font-bold text-slate-400 text-xs">
                        {index + 1}
                      </td>

                      {/* Candidate Name */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleToggleStar(item)}
                            className={`p-1 rounded hover:bg-slate-100 transition-colors ${item.isStarred ? 'text-amber-500' : 'text-slate-300'}`}
                            title={item.isStarred ? 'Unstar' : 'Star'}
                          >
                            <FiStar size={14} className={item.isStarred ? 'fill-amber-400' : ''} />
                          </button>
                          <div>
                            <div className="font-bold text-slate-900">{item.name}</div>
                            <div className="text-[10px] text-slate-400">{item.experience || 'Not Specified'}</div>
                          </div>
                        </div>
                      </td>

                      {/* Applied Role */}
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-slate-800">{item.jobTitle}</div>
                        <div className="mt-0.5">
                          <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider ${
                            isIntern 
                              ? 'bg-amber-50 text-amber-600 border border-amber-100' 
                              : 'bg-blue-50 text-blue-600 border border-blue-100'
                          }`}>
                            {isIntern ? <FiAward size={10} /> : <FiBriefcase size={10} />}
                            {item.jobType || 'Full-Time'}
                          </span>
                        </div>
                      </td>

                      {/* Contact Info */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-1.5 text-slate-700 font-medium">
                          <FiMail size={12} className="text-slate-400" />
                          <span>{item.email}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-slate-500 text-[11px] mt-0.5">
                          <FiPhone size={12} className="text-slate-400" />
                          <span>{item.phone}</span>
                        </div>
                      </td>

                      {/* Applied Date */}
                      <td className="py-3.5 px-4 font-mono text-[10px] text-slate-400">
                        {new Date(item.createdAt).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </td>

                      {/* Status */}
                      <td className="py-3.5 px-4">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                          item.status === 'Shortlisted' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' :
                          item.status === 'Reviewed' ? 'bg-blue-50 text-blue-700 border border-blue-100' :
                          item.status === 'Rejected' ? 'bg-red-50 text-red-700 border border-red-100' :
                          'bg-amber-50 text-amber-700 border border-amber-100'
                        }`}>
                          {item.status || 'Pending'}
                        </span>
                      </td>

                      {/* Action Dropdown */}
                      <td className="py-3.5 px-4 text-center relative">
                        <button
                          onClick={() => setActiveDropdownId(activeDropdownId === item.id ? null : item.id)}
                          className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-600 transition-colors"
                        >
                          <FiSettings size={14} />
                        </button>

                        {/* Dropdown Menu */}
                        {activeDropdownId === item.id && (
                          <div className="absolute right-4 top-12 z-20 w-44 bg-white rounded-xl shadow-xl border border-slate-100 py-1.5 text-left font-medium">
                            <button
                              onClick={() => {
                                setTargetItem(item)
                                setIsViewModalOpen(true)
                                setActiveDropdownId(null)
                              }}
                              className="w-full px-3 py-2 text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                            >
                              <FiEye size={14} className="text-blue-500" />
                              View Full Application
                            </button>

                            <button
                              onClick={() => handleUpdateStatus(item, 'Shortlisted')}
                              className="w-full px-3 py-2 text-xs text-emerald-600 hover:bg-emerald-50 flex items-center gap-2"
                            >
                              <FiCheckCircle size={14} />
                              Mark Shortlisted
                            </button>

                            <button
                              onClick={() => handleUpdateStatus(item, 'Reviewed')}
                              className="w-full px-3 py-2 text-xs text-blue-600 hover:bg-blue-50 flex items-center gap-2"
                            >
                              <FiFileText size={14} />
                              Mark Reviewed
                            </button>

                            <button
                              onClick={() => handleUpdateStatus(item, 'Rejected')}
                              className="w-full px-3 py-2 text-xs text-slate-500 hover:bg-slate-100 flex items-center gap-2"
                            >
                              <FiXCircle size={14} />
                              Mark Rejected
                            </button>

                            <div className="border-t border-slate-100 my-1" />

                            <button
                              onClick={() => {
                                setTargetItem(item)
                                setIsDeleteModalOpen(true)
                                setActiveDropdownId(null)
                              }}
                              className="w-full px-3 py-2 text-xs text-red-600 hover:bg-red-50 flex items-center gap-2"
                            >
                              <FiTrash2 size={14} />
                              Delete Record
                            </button>
                          </div>
                        )}
                      </td>

                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* View Full Application Modal */}
      <AnimatePresence>
        {isViewModalOpen && targetItem && (
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
              className="w-full max-w-xl bg-white rounded-2xl shadow-2xl p-6 relative overflow-hidden"
            >
              <div className="flex justify-between items-start pb-4 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  {targetItem.profilePhoto ? (
                    <img
                      src={targetItem.profilePhoto.startsWith('/') ? `http://localhost:5000${targetItem.profilePhoto}` : targetItem.profilePhoto}
                      alt={targetItem.name}
                      className="w-12 h-12 rounded-full object-cover border-2 border-orange-500 shadow-md"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-orange-100 text-orange-600 font-bold flex items-center justify-center text-lg">
                      {targetItem.name?.charAt(0) || 'C'}
                    </div>
                  )}
                  <div>
                    <h3 className="font-bold text-xl text-slate-900">{targetItem.name}</h3>
                    <p className="text-xs font-semibold text-slate-500">Applying for: <span className="text-orange-600">{targetItem.jobTitle}</span> ({targetItem.jobType})</p>
                  </div>
                </div>
                <button onClick={() => setIsViewModalOpen(false)} className="text-slate-400 hover:text-slate-700">
                  <FiX size={20} />
                </button>
              </div>

              <div className="py-4 space-y-4 text-xs text-slate-700">
                <div className="grid grid-cols-2 gap-4 bg-slate-50 p-4 rounded-xl">
                  <div>
                    <span className="font-bold text-slate-400 uppercase text-[10px] block">Email</span>
                    <span className="font-semibold text-slate-800">{targetItem.email}</span>
                  </div>
                  <div>
                    <span className="font-bold text-slate-400 uppercase text-[10px] block">Phone / WhatsApp</span>
                    <span className="font-semibold text-slate-800">{targetItem.phone}</span>
                  </div>
                  <div>
                    <span className="font-bold text-slate-400 uppercase text-[10px] block">Experience / Level</span>
                    <span className="font-semibold text-slate-800">{targetItem.experience || 'Not Specified'}</span>
                  </div>
                  <div>
                    <span className="font-bold text-slate-400 uppercase text-[10px] block">Applied Date</span>
                    <span className="font-semibold text-slate-800">{new Date(targetItem.createdAt).toLocaleString()}</span>
                  </div>
                </div>

                {targetItem.portfolio && (
                  <div>
                    <span className="font-bold text-slate-400 uppercase text-[10px] block mb-1">Portfolio / LinkedIn</span>
                    <a href={targetItem.portfolio} target="_blank" rel="noreferrer" className="text-orange-600 font-bold hover:underline flex items-center gap-1">
                      {targetItem.portfolio} <FiExternalLink size={12} />
                    </a>
                  </div>
                )}

                {targetItem.resume && (
                  <div>
                    <span className="font-bold text-slate-400 uppercase text-[10px] block mb-1">Uploaded Resume File</span>
                    <a
                      href={targetItem.resume.startsWith('/') ? `http://localhost:5000${targetItem.resume}` : targetItem.resume}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-blue-50 text-blue-700 font-bold border border-blue-200 hover:bg-blue-100 transition-all text-xs"
                    >
                      <FiFileText size={14} />
                      <span>View Candidate Resume</span>
                      <FiExternalLink size={12} />
                    </a>
                  </div>
                )}

                {targetItem.coverLetter && (
                  <div>
                    <span className="font-bold text-slate-400 uppercase text-[10px] block mb-1">Message / Cover Letter</span>
                    <div className="p-3 bg-slate-50 rounded-xl text-slate-600 leading-relaxed font-sans">
                      {targetItem.coverLetter}
                    </div>
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-slate-100 flex justify-end gap-3">
                <button
                  onClick={() => setIsViewModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 font-bold text-xs hover:bg-slate-200"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {isDeleteModalOpen && targetItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
          >
            <div className="w-full max-w-md bg-white rounded-2xl p-6 text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-red-50 text-red-600 flex items-center justify-center mx-auto text-xl">
                <FiAlertCircle />
              </div>
              <h3 className="font-bold text-lg text-slate-900">Delete Job Application?</h3>
              <p className="text-xs text-slate-500">
                Are you sure you want to delete application from <strong className="text-slate-800">{targetItem.name}</strong>? This action cannot be undone.
              </p>
              <div className="flex justify-center gap-3 pt-2">
                <button
                  onClick={() => setIsDeleteModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 text-xs font-bold"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  className="px-4 py-2 rounded-xl bg-red-600 text-white text-xs font-bold hover:bg-red-700 shadow-md"
                >
                  Delete Record
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  )
}

export default AdminApplications
