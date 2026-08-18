/**
 * admin/pages/AdminCareers.jsx
 * ─────────────────────────────────────────────────────────────
 * ADVMEN Technologies — Admin Careers & Job Openings Management (Industrial Light Theme)
 * ─────────────────────────────────────────────────────────────
 */

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  FiBriefcase, 
  FiPlus, 
  FiEdit2, 
  FiTrash2, 
  FiX, 
  FiCheck, 
  FiAlertCircle,
  FiSearch,
  FiCheckCircle,
  FiClock,
  FiRefreshCw,
  FiSettings,
  FiEye,
  FiXCircle,
  FiMapPin,
  FiUserCheck,
  FiUploadCloud
} from 'react-icons/fi'
import { useAdminAuth } from '@/admin/context/AdminAuthContext'

const AdminCareers = () => {
  const { token } = useAdminAuth()
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedDepartment, setSelectedDepartment] = useState('All')

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
    department: '',
    location: 'Gurugram / Remote',
    type: 'Full-Time',
    experienceString: '',
    skillsString: '',
    responsibilitiesString: '',
    requirementsString: '',
    salary: '',
    image: '',
    isActive: true,
  })
  const [formErrors, setFormErrors] = useState({})
  const [isSaving, setIsSaving] = useState(false)

  const fetchCareersData = async () => {
    setLoading(true)
    try {
      const response = await fetch('http://localhost:5000/api/careers/all', {
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
    fetchCareersData()
  }, [])

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 4000)
      return () => clearTimeout(timer)
    }
  }, [toast])

  const showToast = (message, type = 'success') => setToast({ message, type })

  const uniqueDepartments = ['All', ...new Set(items.map(item => item.department))]
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

      const response = await fetch('http://localhost:5000/api/media/upload', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
        body: formData,
      })

      clearInterval(interval)
      setUploadProgress(100)

      if (response.ok) {
        const data = await response.json()
        setFormValues(prev => ({ ...prev, image: data.url }))
        showToast('Banner image uploaded successfully.')
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
      title: '', department: '', location: 'Gurugram / Remote', type: 'Full-Time',
      experienceString: '', skillsString: '', responsibilitiesString: '', requirementsString: '', salary: '', image: '', isActive: true
    })
    setFormErrors({})
    setIsModalOpen(true)
  }

  const handleOpenEditModal = (item) => {
    setCurrentItem(item)
    setFormValues({
      title: item.title || '',
      department: item.department || '',
      location: item.location || 'Gurugram / Remote',
      type: item.type || 'Full-Time',
      experienceString: item.experience ? item.experience.join(', ') : '',
      skillsString: item.skills ? item.skills.join(', ') : '',
      responsibilitiesString: item.responsibilities ? item.responsibilities.join('\n') : '',
      requirementsString: item.requirements ? item.requirements.join('\n') : '',
      salary: item.salary || '',
      image: item.image || '',
      isActive: item.isActive !== false,
    })
    setFormErrors({})
    setIsModalOpen(true)
  }

  const validateForm = () => {
    const errors = {}
    if (!formValues.title?.trim()) errors.title = 'Job title is required'
    if (!formValues.department?.trim()) errors.department = 'Department is required'
    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSaveItem = async () => {
    if (!validateForm()) return
    setIsSaving(true)

    const parseCommaString = (str) => str ? str.split(',').map(s => s.trim()).filter(Boolean) : []
    const parseLineString = (str) => str ? str.split('\n').map(s => s.trim()).filter(Boolean) : []

    const payload = {
      ...formValues,
      experience: parseCommaString(formValues.experienceString),
      skills: parseCommaString(formValues.skillsString),
      responsibilities: parseLineString(formValues.responsibilitiesString),
      requirements: parseLineString(formValues.requirementsString),
    }

    try {
      const url = currentItem 
        ? `http://localhost:5000/api/careers/${currentItem.id}`
        : 'http://localhost:5000/api/careers'
      
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
        showToast(currentItem ? 'Job opening updated!' : 'Job opening created!')
        setIsModalOpen(false)
        fetchCareersData()
      } else {
        const errorData = await response.json()
        showToast(errorData.message || 'Failed to save job opening', 'error')
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
      const res = await fetch(`http://localhost:5000/api/careers/${item.id}/toggle`, {
        method: 'PATCH',
        headers: { 'Authorization': `Bearer ${token}` }
      })
      if (res.ok) {
        showToast(`Job opening ${item.isActive ? 'disabled' : 'enabled'} successfully!`)
        fetchCareersData()
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
      const res = await fetch(`http://localhost:5000/api/careers/${deleteItemTarget.id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      })
      if (res.ok) {
        showToast('Job opening deleted successfully')
        fetchCareersData()
      } else {
        showToast('Failed to delete job opening', 'error')
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
                          item.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (item.location && item.location.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesDepartment = selectedDepartment === 'All' || item.department === selectedDepartment
    return matchesSearch && matchesDepartment
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
                <FiBriefcase size={24} />
              </span>
              Careers Registry
            </h1>
            <p className="text-sm text-slate-500 font-medium mt-1">
              Manage job openings, skill specs, and candidate hiring roles
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <button 
              onClick={fetchCareersData}
              className="p-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 transition-all shadow-sm"
              title="Refresh Registry"
            >
              <FiRefreshCw size={18} className={loading ? 'animate-spin' : ''} />
            </button>
            <button
              onClick={handleOpenAddModal}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#ff6b00] hover:bg-[#e05e00] text-white font-bold text-sm shadow-sm transition-all"
            >
              <FiPlus size={18} /> Add Job Opening
            </button>
          </div>
        </div>

        {/* 4 Stat Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          
          {/* Stat 1 */}
          <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-[0_2px_12px_rgba(0,0,0,0.03)] flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center flex-shrink-0">
              <FiBriefcase size={22} />
            </div>
            <div>
              <div className="text-2xl font-bold text-slate-900">{totalItems}</div>
              <div className="text-xs font-bold text-slate-700">Total Openings</div>
              <div className="text-[10px] text-slate-400 font-medium">Careers database</div>
            </div>
          </div>

          {/* Stat 2 */}
          <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-[0_2px_12px_rgba(0,0,0,0.03)] flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0">
              <FiCheckCircle size={22} />
            </div>
            <div>
              <div className="text-2xl font-bold text-slate-900">{activeItems}</div>
              <div className="text-xs font-bold text-slate-700">Active Openings</div>
              <div className="text-[10px] text-slate-400 font-medium">Live for applicants</div>
            </div>
          </div>

          {/* Stat 3 */}
          <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-[0_2px_12px_rgba(0,0,0,0.03)] flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0">
              <FiUserCheck size={22} />
            </div>
            <div>
              <div className="text-2xl font-bold text-slate-900">{uniqueDepartments.length - 1}</div>
              <div className="text-xs font-bold text-slate-700">Departments</div>
              <div className="text-[10px] text-slate-400 font-medium">Hiring sectors</div>
            </div>
          </div>

          {/* Stat 4 */}
          <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-[0_2px_12px_rgba(0,0,0,0.03)] flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-slate-100 text-slate-600 flex items-center justify-center flex-shrink-0">
              <FiClock size={22} />
            </div>
            <div>
              <div className="text-2xl font-bold text-slate-900">{inactiveItems}</div>
              <div className="text-xs font-bold text-slate-700">Draft Openings</div>
              <div className="text-[10px] text-slate-400 font-medium">On hold / Closed</div>
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
              placeholder="Search job title, skills, location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium text-slate-700 placeholder-slate-400 focus:bg-white focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none transition-all"
            />
          </div>

          {/* Department Filter Pills */}
          <div className="flex gap-2 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {uniqueDepartments.map(dep => (
              <button
                key={dep}
                onClick={() => setSelectedDepartment(dep)}
                className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all border ${
                  selectedDepartment === dep
                    ? 'bg-orange-500 text-white border-orange-500 shadow-sm'
                    : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                }`}
              >
                {dep}
              </button>
            ))}
          </div>

        </div>

        {/* Main Careers Table Card */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-[0_2px_12px_rgba(0,0,0,0.03)] overflow-hidden min-h-[420px]">
          
          <div className="overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="w-8 h-8 border-2 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : filteredItems.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-64 text-slate-400">
                <FiBriefcase size={36} className="mb-3 text-slate-300" />
                <p className="text-sm font-semibold text-slate-500">No job openings found</p>
                <p className="text-xs text-slate-400 mt-1">Try adding a new job position or adjusting your search query</p>
              </div>
            ) : (
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-100 bg-white">
                    <th className="px-4 py-3.5 text-[11px] font-bold text-slate-400 uppercase tracking-wider w-12 text-center">#</th>
                    <th className="px-4 py-3.5 text-[11px] font-bold text-slate-400 uppercase tracking-wider w-24">ID</th>
                    <th className="px-4 py-3.5 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Position / Title</th>
                    <th className="px-4 py-3.5 text-[11px] font-bold text-slate-400 uppercase tracking-wider w-32">Department</th>
                    <th className="px-4 py-3.5 text-[11px] font-bold text-slate-400 uppercase tracking-wider w-44">Location / Type</th>
                    <th className="px-4 py-3.5 text-[11px] font-bold text-slate-400 uppercase tracking-wider w-28">Status</th>
                    <th className="px-4 py-3.5 text-[11px] font-bold text-slate-400 uppercase tracking-wider w-20 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredItems.map((item, idx) => (
                    <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                      
                      {/* Index */}
                      <td className="px-4 py-3.5 align-middle text-xs font-semibold text-slate-400 text-center">
                        {idx + 1}
                      </td>

                      {/* ID */}
                      <td className="px-4 py-3.5 align-middle text-xs font-mono font-bold text-slate-700">
                        JOB{String(idx + 101).padStart(4, '0')}
                      </td>

                      {/* Position / Title */}
                      <td className="px-4 py-3.5 align-middle">
                        <div className="flex items-center gap-3">
                          {item.image ? (
                            <img 
                              src={item.image} 
                              alt={item.title} 
                              className="w-10 h-10 rounded-xl object-cover border border-slate-200 shadow-sm flex-shrink-0 bg-slate-50"
                            />
                          ) : (
                            <div className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-400 flex-shrink-0">
                              <FiBriefcase size={18} />
                            </div>
                          )}
                          <div className="flex flex-col justify-center min-w-0">
                            <div className="font-bold text-sm text-slate-800 leading-snug truncate max-w-[200px]" title={item.title}>{item.title}</div>
                            {Array.isArray(item.skills) && item.skills.length > 0 && (
                              <div className="flex flex-wrap gap-1 mt-0.5">
                                {item.skills.slice(0, 3).map((skill, sIdx) => (
                                  <span key={sIdx} className="text-[10px] font-semibold text-orange-600 bg-orange-50 px-2 py-0.5 rounded border border-orange-100">
                                    {skill}
                                  </span>
                                ))}
                                {item.skills.length > 3 && (
                                  <span className="text-[10px] text-slate-400 self-center font-bold">
                                    +{item.skills.length - 3}
                                  </span>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      </td>

                      {/* Department */}
                      <td className="px-4 py-3.5 align-middle">
                        <span className="inline-flex px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-600 border border-blue-100 whitespace-nowrap">
                          {item.department}
                        </span>
                      </td>

                      {/* Location / Type */}
                      <td className="px-4 py-3.5 align-middle text-xs text-slate-600 font-medium">
                        <div className="flex items-center gap-1 text-slate-700 font-medium">
                          <FiMapPin size={12} className="text-orange-500 flex-shrink-0" />
                          <span className="truncate max-w-[150px]" title={item.location}>{item.location || 'Gurugram / Remote'}</span>
                        </div>
                        <div className="text-[11px] text-slate-400 mt-0.5 pl-4">{item.type || 'Full-Time'}</div>
                      </td>

                      {/* Status Badge */}
                      <td className="px-4 py-3.5 align-middle">
                        {item.isActive !== false ? (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-600 border border-emerald-100 whitespace-nowrap">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                            Active
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-500 border border-slate-200 whitespace-nowrap">
                            <span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span>
                            Closed
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
                                  Edit Opening
                                </button>
                                <button
                                  onClick={() => handleToggleActive(item)}
                                  className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 rounded-lg transition-colors cursor-pointer"
                                >
                                  {item.isActive !== false ? (
                                    <>
                                      <FiXCircle size={14} className="text-amber-500" />
                                      <span>Close Opening</span>
                                    </>
                                  ) : (
                                    <>
                                      <FiCheckCircle size={14} className="text-emerald-500" />
                                      <span>Enable Opening</span>
                                    </>
                                  )}
                                </button>
                                <div className="my-1 border-t border-slate-100"></div>
                                <button
                                  onClick={() => { setActiveDropdownId(null); setDeleteItemTarget(item); setIsDeleteModalOpen(true); }}
                                  className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                                >
                                  <FiTrash2 size={14} className="text-red-500" />
                                  Delete Opening
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
                  {currentItem ? 'Edit Job Opening' : 'Add New Job Opening'}
                </h3>
                <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-700 transition-colors">
                  <FiX size={22} />
                </button>
              </div>

              {/* Form Body */}
              <div className="px-6 py-6 space-y-5">
                
                {/* Job Title */}
                <div>
                  <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1.5">Job Title *</label>
                  <input
                    type="text"
                    placeholder="e.g. MERN Stack Developer"
                    value={formValues.title}
                    onChange={(e) => setFormValues({ ...formValues, title: e.target.value })}
                    className={`w-full px-4 py-2.5 rounded-lg text-sm bg-white border ${formErrors.title ? 'border-red-500' : 'border-gray-300'} outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-all`}
                  />
                  {formErrors.title && <span className="text-[10px] text-red-500 mt-1">{formErrors.title}</span>}
                </div>

                {/* Banner Image Upload Only */}
                <div>
                  <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1.5">Banner / Job Image</label>
                  <div className="flex items-center gap-3">
                    <label className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 cursor-pointer transition-all text-xs font-semibold text-gray-600">
                      <FiUploadCloud size={18} className="text-gray-500" />
                      <span>{uploading ? `Uploading (${uploadProgress}%)...` : (formValues.image ? 'Change Uploaded Banner' : 'Upload Banner Image (PNG, JPG, GIF up to 5MB)')}</span>
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

                {/* Department & Location */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1.5">Department *</label>
                    <select
                      value={formValues.department}
                      onChange={(e) => setFormValues({ ...formValues, department: e.target.value })}
                      className={`w-full px-4 py-2.5 rounded-lg text-sm bg-white border ${formErrors.department ? 'border-red-500' : 'border-gray-300'} outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-all`}
                    >
                      <option value="">Select Department</option>
                      <option value="Engineering">Engineering</option>
                      <option value="Design">Design</option>
                      <option value="Sales">Sales</option>
                      <option value="Marketing">Marketing</option>
                      <option value="Management">Management</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1.5">Location</label>
                    <input
                      type="text"
                      placeholder="e.g. Gurugram / Remote"
                      value={formValues.location}
                      onChange={(e) => setFormValues({ ...formValues, location: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-lg text-sm bg-white border border-gray-300 outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-all"
                    />
                  </div>
                </div>

                {/* Job Type & Salary */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1.5">Employment Type</label>
                    <select
                      value={formValues.type}
                      onChange={(e) => setFormValues({ ...formValues, type: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-lg text-sm bg-white border border-gray-300 outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-all"
                    >
                      <option value="Full-Time">Full-Time</option>
                      <option value="Part-Time">Part-Time</option>
                      <option value="Contract">Contract</option>
                      <option value="Internship">Internship</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1.5">Salary Range / Package</label>
                    <input
                      type="text"
                      placeholder="e.g. ₹6 - ₹12 LPA or Best in Industry"
                      value={formValues.salary}
                      onChange={(e) => setFormValues({ ...formValues, salary: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-lg text-sm bg-white border border-gray-300 outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-all"
                    />
                  </div>
                </div>

                {/* Experience Levels & Required Skills */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1.5">Experience Levels (Comma-Separated)</label>
                    <input
                      type="text"
                      placeholder="e.g. Fresher (0-1 yr), Junior (1-3 yrs)"
                      value={formValues.experienceString}
                      onChange={(e) => setFormValues({ ...formValues, experienceString: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-lg text-sm bg-white border border-gray-300 outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1.5">Required Skills (Comma-Separated)</label>
                    <input
                      type="text"
                      placeholder="e.g. React, Node.js, MongoDB"
                      value={formValues.skillsString}
                      onChange={(e) => setFormValues({ ...formValues, skillsString: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-lg text-sm bg-white border border-gray-300 outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-all"
                    />
                  </div>
                </div>

                {/* Responsibilities */}
                <div>
                  <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1.5">Responsibilities (One per line)</label>
                  <textarea
                    placeholder="Build scalable web apps&#10;Write clean reusable code&#10;Collaborate with team"
                    value={formValues.responsibilitiesString}
                    onChange={(e) => setFormValues({ ...formValues, responsibilitiesString: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg text-sm bg-white border border-gray-300 outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-all h-24 resize-none"
                  />
                </div>

                {/* Requirements */}
                <div>
                  <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1.5">Requirements (One per line)</label>
                  <textarea
                    placeholder="Strong JS fundamentals&#10;Git proficiency&#10;Good communication"
                    value={formValues.requirementsString}
                    onChange={(e) => setFormValues({ ...formValues, requirementsString: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg text-sm bg-white border border-gray-300 outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-all h-24 resize-none"
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
                    'Save Opening'
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
                  <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-100">
                    {viewItemTarget.department}
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
                  <div className="w-full h-44 rounded-xl overflow-hidden border border-slate-200 shadow-sm">
                    <img src={viewItemTarget.image} alt={viewItemTarget.title} className="w-full h-full object-cover" />
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-100">
                  <div>
                    <span className="text-[10px] font-bold uppercase text-slate-400 block">Location</span>
                    <span className="text-xs font-semibold text-slate-700">{viewItemTarget.location || 'Remote'}</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase text-slate-400 block">Type</span>
                    <span className="text-xs font-semibold text-slate-700">{viewItemTarget.type || 'Full-Time'}</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase text-slate-400 block">Salary / Package</span>
                    <span className="text-xs font-semibold text-slate-700">{viewItemTarget.salary || 'Best in Industry'}</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase text-slate-400 block">Status</span>
                    <span className={`text-xs font-bold ${viewItemTarget.isActive !== false ? 'text-emerald-600' : 'text-slate-500'}`}>
                      {viewItemTarget.isActive !== false ? '● Active Opening' : '○ Closed'}
                    </span>
                  </div>
                </div>

                {Array.isArray(viewItemTarget.skills) && viewItemTarget.skills.length > 0 && (
                  <div>
                    <span className="text-[10px] font-bold uppercase text-slate-400 block mb-2">Required Skills</span>
                    <div className="flex flex-wrap gap-1.5">
                      {viewItemTarget.skills.map((skill, sIdx) => (
                        <span key={sIdx} className="text-xs font-semibold text-orange-600 bg-orange-50 px-2.5 py-1 rounded-lg border border-orange-100">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {Array.isArray(viewItemTarget.responsibilities) && viewItemTarget.responsibilities.length > 0 && (
                  <div>
                    <span className="text-[10px] font-bold uppercase text-slate-400 block mb-1">Responsibilities</span>
                    <ul className="list-disc pl-5 text-xs text-slate-600 space-y-1">
                      {viewItemTarget.responsibilities.map((resp, rIdx) => (
                        <li key={rIdx}>{resp}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {Array.isArray(viewItemTarget.requirements) && viewItemTarget.requirements.length > 0 && (
                  <div>
                    <span className="text-[10px] font-bold uppercase text-slate-400 block mb-1">Requirements</span>
                    <ul className="list-disc pl-5 text-xs text-slate-600 space-y-1">
                      {viewItemTarget.requirements.map((req, reqIdx) => (
                        <li key={reqIdx}>{req}</li>
                      ))}
                    </ul>
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
              <h3 className="text-lg font-bold text-slate-800 mb-2">Delete Job Opening?</h3>
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

export default AdminCareers
