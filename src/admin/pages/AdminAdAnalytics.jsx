import { useState, useEffect } from 'react'
import { adAdminAPI } from '@utils/adApi'

const AdminAdAnalytics = () => {
  const [stats, setStats] = useState(null)
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchData = async () => {
    setLoading(true)
    try {
      const [statsRes, bookingsRes] = await Promise.all([
        adAdminAPI.getStats(),
        adAdminAPI.getAllBookings()
      ])

      if (statsRes.success) setStats(statsRes.data)
      if (bookingsRes.success) setBookings(bookingsRes.data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  if (loading || !stats) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="spinner" />
      </div>
    )
  }

  // Calculate status breakdown
  const statusCounts = bookings.reduce((acc, b) => {
    acc[b.status] = (acc[b.status] || 0) + 1
    return acc
  }, {})

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto" style={{ color: "var(--admin-text-primary)" }}>
      <div className="flex justify-between items-center mb-8 border-b pb-6" style={{ background: "var(--admin-bg)", borderColor: `var(--admin-border)` }}>
        <div>
          <h1 className="text-3xl font-bold">Ad Module Analytics</h1>
          <p className="text-slate-500 mt-2">Platform performance and booking breakdown.</p>
        </div>
      </div>

      {/* Top Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <div className="p-6 rounded-2xl bg-white/5 border border-orange-500/30">
          <p className="text-xs font-mono uppercase text-slate-400 mb-2">Total Revenue</p>
          <p className="text-3xl font-display font-bold text-orange-400">
            ₹{stats.totalRevenue.toLocaleString()}
          </p>
        </div>
        <div className="p-6 rounded-2xl bg-white/5 border border-green-500/30">
          <p className="text-xs font-mono uppercase text-slate-400 mb-2">Active Campaigns</p>
          <p className="text-3xl font-display font-bold text-green-400">
            {stats.activeCampaigns}
          </p>
        </div>
        <div className="p-6 rounded-2xl bg-white/5 border border-blue-500/30">
          <p className="text-xs font-mono uppercase text-slate-400 mb-2">Total Spaces</p>
          <p className="text-3xl font-display font-bold text-blue-400">
            {stats.totalSpaces}
          </p>
        </div>
        <div className="p-6 rounded-2xl bg-white/5 border border-purple-500/30">
          <p className="text-xs font-mono uppercase text-slate-400 mb-2">Total Users</p>
          <p className="text-3xl font-display font-bold text-purple-400">
            {stats.totalUsers}
          </p>
        </div>
      </div>

      {/* Booking Status Breakdown */}
      <div className="border shadow-sm rounded-2xl p-6" style={{ background: "var(--admin-bg)", borderColor: `var(--admin-border)` }}>
        <h2 className="text-xl font-bold mb-6 border-b border-white/10 pb-4">Booking Status Breakdown</h2>
        
        {Object.keys(statusCounts).length === 0 ? (
          <p className="text-slate-400">No bookings to analyze.</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {Object.entries(statusCounts).map(([status, count]) => (
              <div key={status} className="p-4 bg-black/50 border border-white/10 rounded-xl flex items-center justify-between">
                <span className="text-xs uppercase font-bold text-slate-300">{status.replace('_', ' ')}</span>
                <span className="text-lg font-bold" style={{ color: "var(--admin-text-primary)" }}>{count}</span>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  )
}

export default AdminAdAnalytics
