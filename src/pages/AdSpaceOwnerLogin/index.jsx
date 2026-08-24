import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAdAuth } from '../../context/AdAuthContext'
import SEOHead from '../../components/common/SEOHead'
import PageTransition from '../../components/common/PageTransition'
import { FiArrowLeft } from 'react-icons/fi'

const AdSpaceOwnerLogin = () => {
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useAdAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await login(formData)
      if (res.success) {
        if (res.data.role === 'owner') navigate('/ad-space/owner/dashboard')
        else setError('Please login through advertiser portal')
      }
    } catch (err) {
      setError(err.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <PageTransition>
      <SEOHead title="Space Owner Login — ADVMEN" />
      <div className="min-h-screen bg-black pt-32 pb-24 flex items-center justify-center">
        <div className="w-full max-w-md p-8 rounded-2xl bg-white/5 border border-[rgba(255,107,0,0.15)] backdrop-blur-md">
          <div className="mb-6">
            <Link to="/ad-space" className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-orange-500 transition-colors font-bold">
              <FiArrowLeft /> Back to Ad Spaces
            </Link>
          </div>
          <div className="text-center mb-8">
            <h1 className="text-2xl font-display font-bold text-white mb-2">Space Owner Login</h1>
            <p className="text-sm text-slate-400">Welcome back to your dashboard.</p>
          </div>
          
          {error && <div className="mb-4 p-3 bg-red-500/20 border border-red-500/50 text-red-400 text-sm rounded-xl">{error}</div>}
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-mono uppercase text-slate-400 mb-2">Email Address</label>
              <input required type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full bg-black border border-white/20 rounded-xl px-4 py-3 text-sm text-white focus:border-orange-500 outline-none" />
            </div>
            <div>
              <label className="block text-xs font-mono uppercase text-slate-400 mb-2">Password</label>
              <input required type="password" value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})} className="w-full bg-black border border-white/20 rounded-xl px-4 py-3 text-sm text-white focus:border-orange-500 outline-none" />
            </div>
            <button disabled={loading} type="submit" className="w-full py-3.5 mt-2 bg-orange-600 hover:bg-orange-500 text-white font-bold rounded-xl transition-colors disabled:opacity-50">
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>
          <div className="mt-6 text-center text-sm text-slate-400">
            Don't have an account? <Link to="/ad-space/owner/register" className="text-orange-500 hover:underline">Register here</Link>
          </div>
        </div>
      </div>
    </PageTransition>
  )
}
export default AdSpaceOwnerLogin
