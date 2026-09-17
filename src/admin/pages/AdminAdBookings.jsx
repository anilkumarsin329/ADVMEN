import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiSettings, FiX, FiBriefcase } from 'react-icons/fi'
import { adAdminAPI } from '@utils/adApi'
import { getImageUrl } from '../../utils/constants'

const AdminAdBookings = () => {
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const [toast, setToast] = useState(null)
  const [openDropdownId, setOpenDropdownId] = useState(null)
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)
  const [currentBooking, setCurrentBooking] = useState(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.action-dropdown-container')) {
        setOpenDropdownId(null)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const fetchBookings = async () => {
    setLoading(true)
    try {
      const res = await adAdminAPI.getAllBookings()
      if (res.success) {
        setBookings(res.data)
      }
    } catch (err) {
      console.error(err)
      showToast('Failed to load bookings', 'error')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchBookings()
  }, [])

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type })
    setTimeout(() => setToast(null), 3000)
  }

  const handleInReview = (id) => {
    setBookings(bookings.map(b => b._id === id ? { ...b, status: 'admin_verified' } : b))
    showToast('Status changed to In Review')
  }

  const handleGoLive = async (id) => {
    try {
      const res = await adAdminAPI.approveAd(id)
      if (res.success) {
        showToast('Campaign is now live!')
        setBookings(bookings.map(b => b._id === id ? { ...b, status: 'live' } : b))
      }
    } catch (err) {
      console.error(err)
      showToast('Failed to approve ad', 'error')
    }
  }

  const handleRefund = async (id) => {
    try {
      const res = await adAdminAPI.processRefund(id)
      if (res.success) {
        showToast('Refund processed successfully')
        setBookings(bookings.map(b => b._id === id ? { ...b, status: 'cancelled' } : b))
      }
    } catch (err) {
      console.error(err)
      showToast('Failed to process refund', 'error')
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'text-gray-400 bg-gray-400/10 border-gray-400/20'
      case 'approved': return 'text-blue-400 bg-blue-400/10 border-blue-400/20'
      case 'payment_pending': return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20'
      case 'paid': return 'text-cyan-400 bg-cyan-400/10 border-cyan-400/20'
      case 'ad_uploaded': return 'text-purple-400 bg-purple-400/10 border-purple-400/20'
      case 'admin_verified': return 'text-indigo-400 bg-indigo-400/10 border-indigo-400/20'
      case 'live': return 'text-green-400 bg-green-400/10 border-green-400/20'
      case 'completed': return 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20'
      case 'cancelled': return 'text-red-400 bg-red-400/10 border-red-400/20'
      default: return 'text-slate-400 bg-slate-400/10 border-slate-400/20'
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="spinner" />
      </div>
    )
  }

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto" style={{ color: "var(--admin-text-primary)" }}>
      <div className="flex justify-between items-center mb-8 border-b pb-6" style={{ background: "var(--admin-bg)", borderColor: `var(--admin-border)` }}>
        <div>
          <h1 className="text-3xl font-bold">Ad Bookings</h1>
          <p className="text-slate-500 mt-2">Manage advertiser campaigns and payouts.</p>
        </div>
      </div>

      {toast && (
        <div className={`mb-6 p-4 rounded-xl border ${toast.type === 'error' ? 'bg-red-500/20 border-red-500/50 text-red-400' : 'bg-emerald-500/20 border-emerald-500/50 text-emerald-400'}`}>
          {toast.msg}
        </div>
      )}

      {bookings.length === 0 ? (
        <div className="text-center py-20 rounded-2xl border shadow-sm bg-[var(--admin-surface)]" style={{ borderColor: 'var(--admin-border)' }}>
          <p className="text-[var(--admin-text-tertiary)]">No bookings found.</p>
        </div>
      ) : (
        <div className="w-full border rounded-2xl bg-[var(--admin-surface)] flex flex-col shadow-sm overflow-hidden" style={{ borderColor: 'var(--admin-border)' }}>
          <div className="w-full overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="sticky top-0 bg-[var(--admin-surface)] z-10 shadow-sm">
                <tr>
                  <th className="p-4 md:p-5 text-[10px] font-mono uppercase tracking-wider text-[var(--admin-text-tertiary)] font-bold border-b w-12" style={{ borderColor: 'var(--admin-border)' }}>#</th>
                  <th className="p-4 md:p-5 text-[10px] font-mono uppercase tracking-wider text-[var(--admin-text-tertiary)] font-bold border-b" style={{ borderColor: 'var(--admin-border)' }}>Advertiser</th>
                  <th className="p-4 md:p-5 text-[10px] font-mono uppercase tracking-wider text-[var(--admin-text-tertiary)] font-bold border-b hidden sm:table-cell" style={{ borderColor: 'var(--admin-border)' }}>Campaign & Space</th>
                  <th className="p-4 md:p-5 text-[10px] font-mono uppercase tracking-wider text-[var(--admin-text-tertiary)] font-bold border-b text-right" style={{ borderColor: 'var(--admin-border)' }}>Amount</th>
                  <th className="p-4 md:p-5 text-[10px] font-mono uppercase tracking-wider text-[var(--admin-text-tertiary)] font-bold border-b text-right hidden xl:table-cell" style={{ borderColor: 'var(--admin-border)' }}>Commission</th>
                  <th className="p-4 md:p-5 text-[10px] font-mono uppercase tracking-wider text-[var(--admin-text-tertiary)] font-bold border-b text-right hidden xl:table-cell" style={{ borderColor: 'var(--admin-border)' }}>Owner Payout</th>
                  <th className="p-4 md:p-5 text-[10px] font-mono uppercase tracking-wider text-[var(--admin-text-tertiary)] font-bold border-b hidden lg:table-cell" style={{ borderColor: 'var(--admin-border)' }}>Date</th>
                  <th className="p-4 md:p-5 text-[10px] font-mono uppercase tracking-wider text-[var(--admin-text-tertiary)] font-bold border-b text-center" style={{ borderColor: 'var(--admin-border)' }}>Status</th>
                  <th className="p-4 md:p-5 text-[10px] font-mono uppercase tracking-wider text-[var(--admin-text-tertiary)] font-bold border-b text-right" style={{ borderColor: 'var(--admin-border)' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking, index) => (
                  <tr key={booking._id} className="group hover:bg-[var(--admin-bg)] transition-colors border-b last:border-b-0" style={{ borderColor: 'var(--admin-border)' }}>
                    <td className="p-4 md:p-5 text-xs text-[var(--admin-text-secondary)] font-mono font-bold">
                      {(index + 1).toString().padStart(2, '0')}
                    </td>
                    <td className="p-4 md:p-5">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-[var(--color-orange)]/10 text-[var(--color-orange)] flex items-center justify-center font-bold font-display shrink-0">
                          {booking.advertiser?.name ? booking.advertiser.name.charAt(0).toUpperCase() : 'U'}
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-bold text-[var(--admin-text-primary)] truncate">{booking.advertiser?.name || 'Unknown'}</p>
                          <p className="text-xs text-[var(--admin-text-secondary)] truncate">{booking.advertiser?.email || 'N/A'}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 md:p-5 hidden sm:table-cell">
                      <div className="flex items-center gap-3">
                        {booking.space?.images?.[0] ? (
                          <img 
                            src={getImageUrl(booking.space.images[0]) || null} 
                            alt="Space" 
                            className="w-10 h-10 rounded object-cover border"
                            style={{ borderColor: 'var(--admin-border)' }}
                          />
                        ) : (
                          <div className="w-10 h-10 rounded border flex items-center justify-center bg-[var(--admin-surface)] text-[var(--admin-text-tertiary)]" style={{ borderColor: 'var(--admin-border)' }}>
                            <FiBriefcase size={16} />
                          </div>
                        )}
                        <div className="flex flex-col min-w-0">
                          <span className="text-xs font-bold text-[var(--admin-text-primary)] truncate">{booking.campaign?.name || 'Campaign Name'}</span>
                          <span className="text-[10px] text-[var(--admin-text-tertiary)] truncate max-w-[180px]">{booking.space?.title || 'Deleted Space'}</span>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 md:p-5 whitespace-nowrap text-sm font-bold text-[var(--admin-text-primary)] font-mono text-right">
                      ₹{booking.pricing?.total?.toLocaleString()}
                    </td>
                    <td className="p-4 md:p-5 whitespace-nowrap text-right text-slate-400 font-mono text-xs hidden xl:table-cell">₹{booking.pricing?.platformFee?.toLocaleString()}</td>
                    <td className="p-4 md:p-5 whitespace-nowrap text-right text-emerald-600 font-mono font-bold text-sm hidden xl:table-cell">₹{booking.pricing?.ownerPayout?.toLocaleString()}</td>
                    <td className="p-4 md:p-5 whitespace-nowrap text-xs text-[var(--admin-text-secondary)] hidden lg:table-cell">
                      {booking.createdAt ? new Date(booking.createdAt).toLocaleDateString() : 'N/A'}
                    </td>
                    <td className="p-4 md:p-5 text-center">
                      <span className={`px-2.5 py-1 text-[10px] font-bold rounded-md border uppercase tracking-wider ${getStatusColor(booking.status)}`}>
                        {booking.status}
                      </span>
                    </td>
                    <td className="p-4 md:p-5 whitespace-nowrap text-right">
                    <div className="relative inline-block text-left action-dropdown-container">
                      <button
                        onClick={() => setOpenDropdownId(openDropdownId === booking._id ? null : booking._id)}
                        className="w-8 h-8 rounded-lg border bg-[var(--admin-surface)] text-[var(--admin-text-secondary)] hover:text-orange-500 hover:border-orange-500 transition-colors flex items-center justify-center ml-auto"
                        style={{ borderColor: 'var(--admin-border)' }}
                      >
                        <FiSettings size={14} />
                      </button>
                      
                      <AnimatePresence>
                        {openDropdownId === booking._id && (
                          <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                            transition={{ duration: 0.15 }}
                            className="absolute right-0 mt-2 w-36 rounded-xl border bg-[var(--admin-surface)] shadow-lg z-50 overflow-hidden"
                            style={{ borderColor: 'var(--admin-border)' }}
                          >
                            <div className="py-2 flex flex-col">
                              <button
                                onClick={() => {
                                  handleGoLive(booking._id)
                                  setOpenDropdownId(null)
                                }}
                                className="w-full text-left px-4 py-2 text-xs font-bold text-green-500 hover:bg-[rgba(0,0,0,0.05)] transition-colors"
                              >
                                Approve
                              </button>
                              <button
                                onClick={() => {
                                  handleRefund(booking._id)
                                  setOpenDropdownId(null)
                                }}
                                className="w-full text-left px-4 py-2 text-xs font-bold text-red-500 hover:bg-[rgba(0,0,0,0.05)] transition-colors"
                              >
                                Reject
                              </button>
                              <button
                                onClick={() => {
                                  handleInReview(booking._id)
                                  setOpenDropdownId(null)
                                }}
                                className="w-full text-left px-4 py-2 text-xs font-bold text-yellow-500 hover:bg-[rgba(0,0,0,0.05)] transition-colors"
                              >
                                In Review
                              </button>
                              <button
                                onClick={() => {
                                  setCurrentBooking(booking)
                                  setIsViewModalOpen(true)
                                  setOpenDropdownId(null)
                                }}
                                className="w-full text-left px-4 py-2 text-xs font-bold text-[var(--admin-text-primary)] hover:bg-[rgba(0,0,0,0.05)] transition-colors"
                              >
                                View
                              </button>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        </div>
      )}

      {/* View Modal */}
      <AnimatePresence>
        {isViewModalOpen && currentBooking && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              className="absolute inset-0 bg-black/50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsViewModalOpen(false)}
            />
            <motion.div
              className="relative bg-white w-full max-w-xl rounded-2xl shadow-2xl flex flex-col overflow-hidden"
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
            >
              <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between bg-white">
                <div>
                  <h3 className="text-xl font-bold font-display text-gray-900">Booking Details</h3>
                  <p className="text-xs text-gray-500 font-mono mt-1">ID: {currentBooking._id}</p>
                </div>
                <button
                  onClick={() => setIsViewModalOpen(false)}
                  className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-500 hover:bg-red-50 hover:text-red-500 transition-colors"
                >
                  <FiX size={16} />
                </button>
              </div>

              <div className="p-6 overflow-y-auto max-h-[70vh] bg-gray-50 flex flex-col gap-6">
                
                <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-4 border-b border-gray-50 pb-2">Campaign Info</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Campaign Name</p>
                      <p className="font-bold text-sm text-gray-900">{currentBooking.campaign?.name}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Status</p>
                      <span className={`px-2 py-0.5 text-[10px] font-bold rounded border uppercase ${getStatusColor(currentBooking.status)}`}>
                        {currentBooking.status}
                      </span>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Advertiser</p>
                      <p className="font-bold text-sm text-gray-900">{currentBooking.advertiser?.name || 'Unknown'}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Space</p>
                      <p className="font-bold text-sm text-gray-900 truncate">{currentBooking.space?.title || 'Unknown Space'}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-4 border-b border-gray-50 pb-2">Financials</h4>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Total Paid</p>
                      <p className="font-mono font-bold text-base text-gray-900">₹{currentBooking.pricing?.total?.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Platform Fee</p>
                      <p className="font-mono font-bold text-sm text-red-500">₹{currentBooking.pricing?.platformFee?.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Owner Payout</p>
                      <p className="font-mono font-bold text-base text-green-600">₹{currentBooking.pricing?.ownerPayout?.toLocaleString()}</p>
                    </div>
                  </div>
                </div>

              </div>

              <div className="px-6 py-4 bg-white border-t border-gray-100 flex justify-end gap-3">
                <button
                  onClick={() => setIsViewModalOpen(false)}
                  className="px-5 py-2 rounded-xl text-sm font-bold bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default AdminAdBookings
