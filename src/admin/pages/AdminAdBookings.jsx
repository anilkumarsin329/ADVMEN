import { useState, useEffect } from 'react'
import { adAdminAPI } from '@utils/adApi'

const AdminAdBookings = () => {
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const [toast, setToast] = useState(null)

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
        <div className="text-center py-20  rounded-2xl border shadow-sm" style={{ background: "var(--admin-bg)", borderColor: `var(--admin-border)` }}>
          <p className="text-slate-400">No bookings found.</p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-2xl border shadow-sm" style={{ background: "var(--admin-bg)", borderColor: `var(--admin-border)` }}>
          <table className="w-full text-left text-sm" style={{ color: "var(--admin-text-primary)" }}>
            <thead className="text-[9px] uppercase tracking-wider bg-[rgba(0,0,0,0.02)] text-slate-500 border-b" style={{ background: "var(--admin-bg)", borderColor: `var(--admin-border)` }}>
              <tr>
                <th className="px-6 py-4">Campaign Name</th>
                <th className="px-6 py-4">Advertiser</th>
                <th className="px-6 py-4">Space Title</th>
                <th className="px-6 py-4 text-right">Total Amount</th>
                <th className="px-6 py-4 text-right">Commission</th>
                <th className="px-6 py-4 text-right">Owner Payout</th>
                <th className="px-6 py-4 text-center">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map(booking => (
                <tr key={booking._id} className="border-b hover:bg-[rgba(0,0,0,0.01)] transition-colors" style={{ background: "var(--admin-bg)", borderColor: `var(--admin-border)` }}>
                  <td className="px-6 py-4 font-bold" style={{ color: "var(--admin-text-primary)" }}>{booking.campaign?.name}</td>
                  <td className="px-6 py-4">{booking.advertiser?.name || 'Unknown'}</td>
                  <td className="px-6 py-4 line-clamp-1">{booking.space?.title || 'Deleted Space'}</td>
                  <td className="px-6 py-4 text-right text-emerald-400 font-mono">₹{booking.pricing?.total}</td>
                  <td className="px-6 py-4 text-right text-slate-300 font-mono">₹{booking.pricing?.platformFee}</td>
                  <td className="px-6 py-4 text-right text-emerald-400 font-mono font-bold">₹{booking.pricing?.ownerPayout}</td>
                  <td className="px-6 py-4 text-center">
                    <span className={`px-2 py-1 text-xs font-bold rounded-md border uppercase ${getStatusColor(booking.status)}`}>
                      {booking.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right space-x-2">
                    {booking.status === 'ad_uploaded' && (
                      <button 
                        onClick={() => handleGoLive(booking._id)}
                        className="px-3 py-1.5 bg-green-600 hover:bg-green-500 text-white rounded-lg text-xs font-bold transition-colors"
                      >
                        Go Live
                      </button>
                    )}
                    {booking.refund?.requested && booking.status !== 'cancelled' && (
                      <button 
                        onClick={() => handleRefund(booking._id)}
                        className="px-3 py-1.5 bg-red-600 hover:bg-red-500 text-white rounded-lg text-xs font-bold transition-colors"
                      >
                        Process Refund
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default AdminAdBookings
