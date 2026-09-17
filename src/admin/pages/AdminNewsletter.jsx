import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiTrash2, FiMail, FiCalendar } from 'react-icons/fi'
import { useAdminAuth } from '@/admin/context/AdminAuthContext'
import { API_BASE_URL } from '../../utils/constants'

const AdminNewsletter = () => {
  const { token } = useAdminAuth()
  const [subscribers, setSubscribers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [isDeleting, setIsDeleting] = useState(null)

  useEffect(() => {
    fetchSubscribers()
  }, [])

  const fetchSubscribers = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/newsletter`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      const data = await response.json()
      if (response.ok && data.success) {
        setSubscribers(data.data)
      } else {
        setError(data.error || 'Failed to fetch subscribers')
      }
    } catch (err) {
      setError('A network error occurred while fetching subscribers')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to remove this subscriber?')) return
    
    setIsDeleting(id)
    try {
      const response = await fetch(`${API_BASE_URL}/api/newsletter/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      const data = await response.json()
      if (response.ok && data.success) {
        setSubscribers(subscribers.filter(s => s._id !== id))
      } else {
        alert(data.error || 'Failed to delete subscriber')
      }
    } catch (err) {
      alert('Network error while deleting subscriber')
    } finally {
      setIsDeleting(null)
    }
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
          <h1 className="text-3xl font-display font-bold text-gray-900 mb-2">Newsletter Subscribers</h1>
          <p className="text-gray-500 font-body">Manage all email subscriptions from the public website.</p>
        </div>
        <div className="bg-white shadow-sm border border-gray-100 rounded-xl px-5 py-3 flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-orange-50 text-orange-500 flex items-center justify-center">
            <FiMail size={20} />
          </div>
          <div>
            <div className="text-sm font-semibold text-gray-400 uppercase tracking-widest">Total Subscribers</div>
            <div className="text-2xl font-bold text-gray-900 leading-none">{subscribers.length}</div>
          </div>
        </div>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 text-red-600 border border-red-200 rounded-xl text-sm font-medium">
          {error}
        </div>
      )}

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-100">
                <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Email Address</th>
                <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Date Subscribed</th>
                <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              <AnimatePresence>
                {subscribers.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="py-12 text-center text-gray-400 font-medium">
                      No subscribers found.
                    </td>
                  </tr>
                ) : (
                  subscribers.map((subscriber) => (
                    <motion.tr 
                      key={subscriber._id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="hover:bg-gray-50/50 transition-colors"
                    >
                      <td className="py-4 px-6">
                        <div className="font-medium text-gray-900">{subscriber.email}</div>
                      </td>
                      <td className="py-4 px-6">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          subscriber.status === 'Active' ? 'bg-green-50 text-green-700' : 'bg-gray-100 text-gray-700'
                        }`}>
                          {subscriber.status}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <FiCalendar size={14} />
                          {new Date(subscriber.createdAt).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                          })}
                        </div>
                      </td>
                      <td className="py-4 px-6 text-right">
                        <button
                          onClick={() => handleDelete(subscriber._id)}
                          disabled={isDeleting === subscriber._id}
                          className={`p-2 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors ${
                            isDeleting === subscriber._id ? 'opacity-50 cursor-not-allowed' : ''
                          }`}
                          title="Delete Subscriber"
                        >
                          <FiTrash2 size={18} />
                        </button>
                      </td>
                    </motion.tr>
                  ))
                )}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default AdminNewsletter
