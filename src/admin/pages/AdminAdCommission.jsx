import { useState, useEffect } from 'react'
import { adAdminAPI } from '@utils/adApi'

const AdminAdCommission = () => {
  const [commission, setCommission] = useState(15) // Default fallback
  const [newCommission, setNewCommission] = useState('')
  const [loading, setLoading] = useState(true)
  const [toast, setToast] = useState(null)

  const fetchCommission = async () => {
    setLoading(true)
    try {
      const res = await adAdminAPI.getCommission()
      if (res.success && res.data) {
        setCommission(res.data.commissionPct)
        setNewCommission(res.data.commissionPct)
      }
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCommission()
  }, [])

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type })
    setTimeout(() => setToast(null), 3000)
  }

  const handleUpdate = async (e) => {
    e.preventDefault()
    if (!newCommission || newCommission < 1 || newCommission > 50) {
      return showToast('Commission must be between 1 and 50', 'error')
    }

    try {
      const res = await adAdminAPI.updateCommission({ commissionPct: Number(newCommission) })
      if (res.success) {
        setCommission(res.data.commissionPct)
        showToast('Commission updated successfully')
      }
    } catch (err) {
      console.error(err)
      showToast('Failed to update commission', 'error')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="spinner" />
      </div>
    )
  }

  const examplePrice = 5000
  const examplePlatformFee = examplePrice * (commission / 100)
  const exampleOwnerPayout = examplePrice - examplePlatformFee

  return (
    <div className="p-6 md:p-10 max-w-4xl mx-auto" style={{ color: "var(--admin-text-primary)" }}>
      <div className="flex justify-between items-center mb-8 border-b pb-6" style={{ background: "var(--admin-bg)", borderColor: `var(--admin-border)` }}>
        <div>
          <h1 className="text-3xl font-bold">Platform Commission</h1>
          <p className="text-slate-500 mt-2">Update the percentage cut ADVMEN takes from every ad booking.</p>
        </div>
      </div>

      {toast && (
        <div className={`mb-6 p-4 rounded-xl border ${toast.type === 'error' ? 'bg-red-500/20 border-red-500/50 text-red-400' : 'bg-emerald-500/20 border-emerald-500/50 text-emerald-400'}`}>
          {toast.msg}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Current & Update Form */}
        <div className="border shadow-sm rounded-2xl p-6" style={{ background: "var(--admin-bg)", borderColor: `var(--admin-border)` }}>
          <div className="text-center mb-8">
            <h2 className="text-slate-400 text-sm font-mono uppercase tracking-wider mb-2">Current Commission</h2>
            <div className="text-6xl font-display font-bold text-orange-500">
              {commission}%
            </div>
          </div>

          <form onSubmit={handleUpdate} className="space-y-4">
            <div>
              <label className="block text-xs font-mono uppercase text-slate-400 mb-2">New Commission % (1-50)</label>
              <input 
                type="number" 
                min="1" 
                max="50" 
                step="0.5"
                value={newCommission}
                onChange={(e) => setNewCommission(e.target.value)}
                className="w-full bg-black border border-white/20 rounded-xl px-4 py-3 text-white focus:border-orange-500 outline-none"
              />
            </div>
            <button 
              type="submit" 
              className="w-full py-3 bg-orange-600 hover:bg-orange-500 text-white font-bold rounded-xl transition-colors"
            >
              Update Commission
            </button>
          </form>
          
          <p className="mt-6 text-xs text-slate-500 text-center">
            * Each update is logged with timestamp for auditing purposes.
          </p>
        </div>

        {/* Example Calculation */}
        <div className="border shadow-sm rounded-2xl p-6 flex flex-col justify-center" style={{ background: "var(--admin-bg)", borderColor: `var(--admin-border)` }}>
          <h3 className="text-lg font-bold mb-6 text-center border-b border-white/10 pb-4">Example Calculation</h3>
          
          <div className="space-y-4 font-mono text-sm">
            <div className="flex justify-between items-center">
              <span className="text-slate-400">Space Price:</span>
              <span className="font-bold">₹{examplePrice}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-400">Commission ({commission}%):</span>
              <span className="text-orange-400">- ₹{examplePlatformFee}</span>
            </div>
            <div className="w-full h-px bg-white/10 my-2" />
            <div className="flex justify-between items-center text-base">
              <span className="text-slate-300">Platform Fee (Profit):</span>
              <span className="font-bold text-orange-400">₹{examplePlatformFee}</span>
            </div>
            <div className="flex justify-between items-center text-base">
              <span className="text-slate-300">Owner Payout:</span>
              <span className="font-bold text-emerald-400">₹{exampleOwnerPayout}</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default AdminAdCommission
