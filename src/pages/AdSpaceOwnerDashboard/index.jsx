import { useEffect, useState } from 'react'
import { useAdAuth } from '../../context/AdAuthContext'
import { adSpaceAPI, adBookingAPI } from '../../utils/adApi'
import { getImageUrl } from '../../utils/constants'
import SEOHead from '../../components/common/SEOHead'
import PageTransition from '../../components/common/PageTransition'
import { FiPlus, FiCheckCircle, FiXCircle } from 'react-icons/fi'

const AdSpaceOwnerDashboard = () => {
  const { adUser, logout } = useAdAuth()
  const [spaces, setSpaces] = useState([])
  const [bookings, setBookings] = useState([]) // We can fetch bookings for all spaces or individually
  const [loading, setLoading] = useState(true)

  // Form states for creating a new space
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    title: '', description: '', spaceType: 'Wall', 
    city: '', address: '', state: '',
    width: '', height: '',
    monthlyPrice: '', dailyTraffic: '', demographics: ''
  })
  const [files, setFiles] = useState([])

  const fetchDashboardData = async () => {
    try {
      const res = await adSpaceAPI.getMine()
      if (res.success) {
        setSpaces(res.data)
        
        // Fetch bookings for each space
        let allBookings = []
        for (const space of res.data) {
          const bRes = await adBookingAPI.getSpaceBookings(space._id)
          if (bRes.success) {
            allBookings = [...allBookings, ...bRes.data]
          }
        }
        setBookings(allBookings)
      }
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const handleCreateSubmit = async (e) => {
    e.preventDefault()
    const data = new FormData()
    data.append('title', formData.title)
    data.append('description', formData.description)
    data.append('spaceType', formData.spaceType)
    data.append('location', JSON.stringify({ address: formData.address, city: formData.city, state: formData.state }))
    data.append('dimensions', JSON.stringify({ width: Number(formData.width), height: Number(formData.height) }))
    data.append('pricing', JSON.stringify({ monthly: Number(formData.monthlyPrice) }))
    data.append('audience', JSON.stringify({ dailyTraffic: Number(formData.dailyTraffic), demographics: formData.demographics }))
    
    Array.from(files).forEach(f => {
      data.append('photos', f)
    })

    try {
      await adSpaceAPI.create(data)
      setShowForm(false)
      fetchDashboardData()
    } catch (err) {
      console.error(err)
      alert('Failed to create space')
    }
  }

  const handleApprove = async (id) => {
    try {
      await adBookingAPI.approve(id)
      fetchDashboardData()
    } catch(err) { console.error(err) }
  }
  const handleReject = async (id) => {
    try {
      await adBookingAPI.reject(id)
      fetchDashboardData()
    } catch(err) { console.error(err) }
  }

  if (loading) return <div className="min-h-screen bg-black flex justify-center items-center"><div className="spinner" /></div>

  return (
    <PageTransition>
      <SEOHead title="Owner Dashboard — ADVMEN" />
      <div className="min-h-screen bg-black pt-32 pb-24 text-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-display font-bold">Owner Dashboard</h1>
              <p className="text-slate-400">Welcome, {adUser.name}. Total Earnings: <span className="text-emerald-400 font-bold">₹{adUser.earnings}</span></p>
            </div>
            <div className="flex gap-4">
              <button onClick={() => setShowForm(!showForm)} className="btn-primary flex items-center gap-2">
                <FiPlus /> New Space
              </button>
              <button onClick={logout} className="btn-secondary">Logout</button>
            </div>
          </div>

          {showForm && (
            <div className="mb-12 p-6 rounded-2xl bg-white/5 border border-white/10">
              <h2 className="text-xl font-bold mb-4">List New Ad Space</h2>
              <form onSubmit={handleCreateSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-slate-400 mb-1">Title</label>
                  <input required value={formData.title} onChange={e=>setFormData({...formData, title: e.target.value})} className="w-full bg-black border border-white/20 rounded-lg p-2 text-sm text-white" />
                </div>
                <div>
                  <label className="block text-xs text-slate-400 mb-1">Space Type</label>
                  <select value={formData.spaceType} onChange={e=>setFormData({...formData, spaceType: e.target.value})} className="w-full bg-black border border-white/20 rounded-lg p-2 text-sm text-white">
                    <option>Wall</option><option>Shop/Storefront</option><option>Building</option><option>Digital Screen</option><option>Vehicle</option><option>Website/App</option><option>Other</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs text-slate-400 mb-1">Description</label>
                  <textarea required value={formData.description} onChange={e=>setFormData({...formData, description: e.target.value})} className="w-full bg-black border border-white/20 rounded-lg p-2 text-sm text-white" />
                </div>
                <div>
                  <label className="block text-xs text-slate-400 mb-1">City</label>
                  <input required value={formData.city} onChange={e=>setFormData({...formData, city: e.target.value})} className="w-full bg-black border border-white/20 rounded-lg p-2 text-sm text-white" />
                </div>
                <div>
                  <label className="block text-xs text-slate-400 mb-1">State</label>
                  <input required value={formData.state} onChange={e=>setFormData({...formData, state: e.target.value})} className="w-full bg-black border border-white/20 rounded-lg p-2 text-sm text-white" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs text-slate-400 mb-1">Address</label>
                  <input required value={formData.address} onChange={e=>setFormData({...formData, address: e.target.value})} className="w-full bg-black border border-white/20 rounded-lg p-2 text-sm text-white" />
                </div>
                <div>
                  <label className="block text-xs text-slate-400 mb-1">Monthly Price (₹)</label>
                  <input type="number" required value={formData.monthlyPrice} onChange={e=>setFormData({...formData, monthlyPrice: e.target.value})} className="w-full bg-black border border-white/20 rounded-lg p-2 text-sm text-white" />
                </div>
                <div>
                  <label className="block text-xs text-slate-400 mb-1">Photos (Up to 5)</label>
                  <input type="file" multiple accept="image/*" onChange={e=>setFiles(e.target.files)} className="w-full bg-black border border-white/20 rounded-lg p-1.5 text-sm text-white" />
                </div>
                <div className="md:col-span-2 flex justify-end gap-2 mt-4">
                  <button type="button" onClick={() => setShowForm(false)} className="btn-secondary text-sm">Cancel</button>
                  <button type="submit" className="btn-primary text-sm">Submit Space</button>
                </div>
              </form>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* My Spaces */}
            <div>
              <h2 className="text-xl font-bold mb-4 border-b border-white/10 pb-2">My Spaces</h2>
              {spaces.length === 0 ? <p className="text-slate-400">No spaces listed yet.</p> : (
                <div className="space-y-4">
                  {spaces.map(space => (
                    <div key={space._id} className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-slate-800 rounded-lg overflow-hidden">
                          <img src={getImageUrl(space.photos?.[0]) || null} className="w-full h-full object-cover" alt="" />
                        </div>
                        <div>
                          <h3 className="font-bold">{space.title}</h3>
                          <p className="text-xs text-slate-400">{space.status} | {space.isApproved ? 'Approved' : 'Pending Admin'}</p>
                        </div>
                      </div>
                      <div className="font-bold text-emerald-400">₹{space.pricing?.monthly}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Bookings */}
            <div>
              <h2 className="text-xl font-bold mb-4 border-b border-white/10 pb-2">Booking Requests</h2>
              {bookings.length === 0 ? <p className="text-slate-400">No booking requests.</p> : (
                <div className="space-y-4">
                  {bookings.map(booking => (
                    <div key={booking._id} className="p-4 rounded-xl bg-white/5 border border-orange-500/30">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-bold text-orange-400">{booking.campaign?.name}</h3>
                        <span className="text-xs px-2 py-1 bg-white/10 rounded font-bold uppercase">{booking.status}</span>
                      </div>
                      <p className="text-sm text-slate-300 mb-2">Advertiser: {booking.advertiser?.name}</p>
                      <div className="flex justify-between text-sm mb-4">
                        <span>Total: ₹{booking.pricing?.total}</span>
                        <span>Your Payout: <span className="text-emerald-400 font-bold">₹{booking.pricing?.ownerPayout}</span></span>
                      </div>
                      
                      {booking.status === 'pending' && (
                        <div className="flex gap-2">
                          <button onClick={() => handleApprove(booking._id)} className="flex-1 py-2 bg-emerald-600/20 text-emerald-500 border border-emerald-500/30 rounded-lg flex items-center justify-center gap-2 hover:bg-emerald-600/40"><FiCheckCircle /> Approve</button>
                          <button onClick={() => handleReject(booking._id)} className="flex-1 py-2 bg-red-600/20 text-red-500 border border-red-500/30 rounded-lg flex items-center justify-center gap-2 hover:bg-red-600/40"><FiXCircle /> Reject</button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </PageTransition>
  )
}
export default AdSpaceOwnerDashboard
