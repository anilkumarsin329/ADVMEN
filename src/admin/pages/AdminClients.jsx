import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiTrash2, FiEdit2, FiPlus, FiImage, FiAward, FiX } from 'react-icons/fi'
import { useAdminAuth } from '@/admin/context/AdminAuthContext'
import { API_BASE_URL, getImageUrl } from '@utils/constants'

const AdminClients = () => {
  const { token } = useAdminAuth()
  const [clients, setClients] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentItem, setCurrentItem] = useState(null)
  
  // Form State
  const [companyName, setCompanyName] = useState('')
  const [description, setDescription] = useState('')
  const [logo, setLogo] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const fileInputRef = useRef(null)

  useEffect(() => {
    fetchClients()
  }, [])

  const fetchClients = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/clients`)
      const data = await response.json()
      if (response.ok) {
        setClients(data)
      } else {
        setError(data.error || 'Failed to fetch clients')
      }
    } catch (err) {
      setError('A network error occurred')
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
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      })
      const data = await response.json()
      if (response.ok) {
        setLogo(data.url)
      } else {
        alert(data.error || 'Failed to upload image')
      }
    } catch (err) {
      alert('Network error while uploading image')
    }
  }

  const handleSave = async (e) => {
    e.preventDefault()
    if (!companyName || !logo) {
      alert('Company Name and Logo are required')
      return
    }

    setIsSubmitting(true)
    try {
      const payload = { companyName, description, logo }
      const url = currentItem ? `${API_BASE_URL}/api/clients/${currentItem._id}` : `${API_BASE_URL}/api/clients`
      const method = currentItem ? 'PUT' : 'POST'

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
        fetchClients()
      } else {
        alert(data.error || 'Failed to save client')
      }
    } catch (err) {
      alert('Network error while saving client')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this client?')) return
    
    try {
      const response = await fetch(`${API_BASE_URL}/api/clients/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      if (response.ok) {
        setClients(clients.filter(c => c._id !== id))
      } else {
        const data = await response.json()
        alert(data.error || 'Failed to delete client')
      }
    } catch (err) {
      alert('Network error while deleting client')
    }
  }

  const openModal = (client = null) => {
    if (client) {
      setCurrentItem(client)
      setCompanyName(client.companyName)
      setDescription(client.description || '')
      setLogo(client.logo)
    } else {
      setCurrentItem(null)
      setCompanyName('')
      setDescription('')
      setLogo('')
    }
    setIsModalOpen(true)
  }

  if (loading) {
    return (
      <div className="w-full h-64 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-gray-200 border-t-[var(--color-orange)] rounded-full animate-spin"></div>
      </div>
    )
  }

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold text-gray-900 mb-2">Industry Leaders</h1>
          <p className="text-gray-500 font-body">Manage the trusted clients showcased on your website.</p>
        </div>
        <button 
          onClick={() => openModal()}
          className="bg-[var(--color-orange)] hover:bg-orange-600 text-white px-5 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2 transition-colors shadow-sm"
        >
          <FiPlus size={18} /> Add Client
        </button>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 text-red-600 border border-red-200 rounded-xl text-sm font-medium">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {clients.map(client => (
          <div key={client._id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col group">
            <div className="h-32 bg-gray-50 flex items-center justify-center p-4 border-b border-gray-100 relative">
              <img src={getImageUrl(client.logo)} alt={client.companyName} className="max-h-full max-w-full object-contain" />
            </div>
            <div className="p-5 flex-1 flex flex-col">
              <h3 className="font-display font-bold text-gray-900 text-lg mb-1">{client.companyName}</h3>
              {client.description && (
                <p className="text-gray-500 text-sm line-clamp-2">{client.description}</p>
              )}
              <div className="mt-4 pt-4 border-t border-gray-100 flex items-center gap-3">
                <button 
                  onClick={() => openModal(client)}
                  className="flex-1 bg-gray-50 hover:bg-gray-100 text-gray-700 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2"
                >
                  <FiEdit2 size={14} /> Edit
                </button>
                <button 
                  onClick={() => handleDelete(client._id)}
                  className="w-10 h-10 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg flex items-center justify-center transition-colors shrink-0"
                >
                  <FiTrash2 size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}

        {clients.length === 0 && !error && (
          <div className="col-span-full py-16 text-center bg-white rounded-2xl border border-gray-100 border-dashed">
            <div className="w-16 h-16 bg-orange-50 text-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <FiAward size={28} />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-1">No clients added</h3>
            <p className="text-gray-500 mb-4 text-sm">Add your first industry leader to display them on the website.</p>
            <button 
              onClick={() => openModal()}
              className="text-[var(--color-orange)] font-semibold text-sm hover:underline"
            >
              Add Client Now
            </button>
          </div>
        )}
      </div>

      {/* Add/Edit Modal */}
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
              className="relative bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden"
            >
              <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                <h2 className="text-lg font-bold text-gray-900">
                  {currentItem ? 'Edit Client' : 'Add New Client'}
                </h2>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="text-gray-400 hover:text-gray-600 p-1 rounded-md"
                >
                  <FiX size={20} />
                </button>
              </div>

              <form onSubmit={handleSave} className="p-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Company Name *</label>
                    <input 
                      type="text" 
                      required
                      value={companyName}
                      onChange={e => setCompanyName(e.target.value)}
                      className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
                      placeholder="e.g. Nexus Corp"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Logo *</label>
                    <div className="flex items-center gap-4">
                      {logo ? (
                        <div className="relative w-20 h-20 rounded-lg border border-gray-200 bg-gray-50 flex items-center justify-center overflow-hidden shrink-0 p-2">
                          <img src={getImageUrl(logo)} alt="Logo" className="max-w-full max-h-full object-contain" />
                          <button
                            type="button"
                            onClick={() => setLogo('')}
                            className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs shadow-sm hover:bg-red-600"
                          >
                            <FiX />
                          </button>
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          className="w-20 h-20 rounded-lg border-2 border-dashed border-gray-200 text-gray-400 hover:text-gray-600 hover:border-gray-300 flex flex-col items-center justify-center gap-1 shrink-0 transition-colors"
                        >
                          <FiImage size={20} />
                          <span className="text-[10px] font-medium uppercase tracking-wider">Upload</span>
                        </button>
                      )}
                      <input 
                        type="file" 
                        ref={fileInputRef} 
                        onChange={handleImageUpload} 
                        accept="image/*" 
                        className="hidden" 
                      />
                      <div className="text-xs text-gray-500">
                        Upload a high-quality logo (transparent PNG recommended).
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Description (Optional)</label>
                    <textarea 
                      rows={3}
                      value={description}
                      onChange={e => setDescription(e.target.value)}
                      className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 resize-none"
                      placeholder="Brief description of the partnership..."
                    />
                  </div>
                </div>

                <div className="mt-8 flex items-center gap-3">
                  <button 
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="flex-1 px-4 py-2.5 bg-gray-50 text-gray-700 rounded-xl text-sm font-semibold hover:bg-gray-100 transition-colors"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    disabled={isSubmitting || !companyName || !logo}
                    className="flex-1 px-4 py-2.5 bg-orange-500 text-white rounded-xl text-sm font-semibold hover:bg-orange-600 transition-colors disabled:opacity-50 flex justify-center"
                  >
                    {isSubmitting ? (
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    ) : (
                      'Save Client'
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

export default AdminClients
