import { useState, useEffect } from 'react'
import { adAdminAPI } from '@utils/adApi'

const AdminAdPayouts = () => {
  const [payouts, setPayouts] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchPayouts = async () => {
    setLoading(true)
    try {
      const res = await adAdminAPI.getAllBookings()
      if (res.success) {
        // Filter only completed bookings
        const completed = res.data.filter(b => b.status === 'completed')
        setPayouts(completed)
      }
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPayouts()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="spinner" />
      </div>
    )
  }

  const totalPayoutAmount = payouts.reduce((sum, p) => sum + (p.pricing?.ownerPayout || 0), 0)

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto" style={{ color: "var(--admin-text-primary)" }}>
      <div className="flex justify-between items-center mb-8 border-b pb-6" style={{ background: "var(--admin-bg)", borderColor: `var(--admin-border)` }}>
        <div>
          <h1 className="text-3xl font-bold">Owner Payouts</h1>
          <p className="text-slate-500 mt-2">View all completed payouts to space owners.</p>
        </div>
      </div>

      <div className="mb-8 p-6 rounded-2xl bg-white/5 border border-emerald-500/30 flex items-center gap-6">
        <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-3xl">
          ₹
        </div>
        <div>
          <p className="text-sm font-mono uppercase text-slate-400">Total Payouts Disbursed</p>
          <p className="text-4xl font-display font-bold" style={{ color: "var(--admin-text-primary)" }}>
            ₹{totalPayoutAmount.toLocaleString()}
          </p>
        </div>
      </div>

      {payouts.length === 0 ? (
        <div className="text-center py-20  rounded-2xl border shadow-sm" style={{ background: "var(--admin-bg)", borderColor: `var(--admin-border)` }}>
          <p className="text-slate-400">No payouts found.</p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-2xl border shadow-sm" style={{ background: "var(--admin-bg)", borderColor: `var(--admin-border)` }}>
          <table className="w-full text-left text-sm" style={{ color: "var(--admin-text-primary)" }}>
            <thead className="text-[9px] uppercase tracking-wider bg-[rgba(0,0,0,0.02)] text-slate-500 border-b" style={{ background: "var(--admin-bg)", borderColor: `var(--admin-border)` }}>
              <tr>
                <th className="px-6 py-4">Owner Name</th>
                <th className="px-6 py-4">Space Title</th>
                <th className="px-6 py-4">Campaign</th>
                <th className="px-6 py-4 text-right">Owner Payout Amount</th>
                <th className="px-6 py-4 text-right">Completed Date</th>
                <th className="px-6 py-4 text-center">Payout Status</th>
              </tr>
            </thead>
            <tbody>
              {payouts.map(p => (
                <tr key={p._id} className="border-b hover:bg-[rgba(0,0,0,0.01)] transition-colors" style={{ background: "var(--admin-bg)", borderColor: `var(--admin-border)` }}>
                  <td className="px-6 py-4 font-bold" style={{ color: "var(--admin-text-primary)" }}>{p.space?.owner?.name || 'Unknown'}</td>
                  <td className="px-6 py-4 line-clamp-1">{p.space?.title || 'Deleted Space'}</td>
                  <td className="px-6 py-4">{p.campaign?.name}</td>
                  <td className="px-6 py-4 text-right text-emerald-400 font-mono font-bold">₹{p.pricing?.ownerPayout}</td>
                  <td className="px-6 py-4 text-right text-slate-400">
                    {new Date(p.updatedAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="px-3 py-1 text-xs font-bold rounded-md border text-green-400 bg-green-400/10 border-green-400/20 uppercase">
                      Paid
                    </span>
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

export default AdminAdPayouts
