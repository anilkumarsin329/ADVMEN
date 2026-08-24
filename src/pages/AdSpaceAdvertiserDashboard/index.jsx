import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAdAuth } from '../../context/AdAuthContext'
import { adBookingAPI } from '../../utils/adApi'
import SEOHead from '../../components/common/SEOHead'
import PageTransition from '../../components/common/PageTransition'
import { FiUpload, FiCreditCard } from 'react-icons/fi'

const AdSpaceAdvertiserDashboard = () => {
  const { adUser, logout } = useAdAuth()
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeUpload, setActiveUpload] = useState(null)
  const [files, setFiles] = useState([])

  const fetchBookings = async () => {
    setLoading(true)
    try {
      const res = await adBookingAPI.getMyBookings()
      if (res.success) setBookings(res.data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchBookings()
  }, [])

  const handlePayment = async (bookingId) => {
    try {
      // 1. Create order
      const res = await adBookingAPI.createOrder(bookingId)
      if (res.success) {
        const order = res.data
        // 2. Open Razorpay Popup
        const options = {
          key: import.meta.env.VITE_RAZORPAY_KEY_ID || 'dummy_key',
          amount: order.amount,
          currency: order.currency,
          name: "ADVMEN Technologies",
          description: "Ad Space Booking",
          order_id: order.id,
          handler: async function (response) {
            // 3. Verify payment
            await adBookingAPI.verifyPayment(bookingId, {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature
            })
            fetchBookings()
          },
          theme: { color: "#FF6B00" }
        }
        const rzp = new window.Razorpay(options)
        rzp.open()
      }
    } catch (err) {
      console.error(err)
      alert('Payment initialization failed')
    }
  }

  const handleUploadCreatives = async (e, bookingId) => {
    e.preventDefault()
    if (!files.length) return
    const formData = new FormData()
    Array.from(files).forEach(f => formData.append('creatives', f))
    
    try {
      await adBookingAPI.uploadCreatives(bookingId, formData)
      setActiveUpload(null)
      fetchBookings()
    } catch (err) {
      console.error(err)
    }
  }

  if (loading) return <div className="min-h-screen bg-black flex justify-center items-center"><div className="spinner" /></div>

  return (
    <PageTransition>
      <SEOHead title="Advertiser Dashboard — ADVMEN" />
      <div className="min-h-screen bg-black pt-32 pb-24 text-white">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="flex justify-between items-center mb-12 border-b border-white/10 pb-6">
            <div>
              <h1 className="text-3xl font-display font-bold">Advertiser Dashboard</h1>
              <p className="text-slate-400">Welcome, {adUser.name}. Manage your campaigns here.</p>
            </div>
            <div className="flex gap-4">
              <Link to="/ad-space/browse" className="btn-primary">Browse Spaces</Link>
              <button onClick={logout} className="btn-secondary">Logout</button>
            </div>
          </div>

          <h2 className="text-2xl font-bold mb-6">My Campaigns</h2>
          
          {bookings.length === 0 ? (
            <div className="text-center py-20 bg-white/5 rounded-2xl border border-white/10">
              <h3 className="text-xl mb-2">No campaigns yet</h3>
              <p className="text-slate-400 mb-4">Start by booking an ad space.</p>
              <Link to="/ad-space/browse" className="text-orange-500 hover:underline">Find Spaces →</Link>
            </div>
          ) : (
            <div className="space-y-6">
              {bookings.map(booking => (
                <div key={booking._id} className="p-6 rounded-2xl bg-white/5 border border-[rgba(255,107,0,0.15)]">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-orange-400">{booking.campaign?.name}</h3>
                      <Link to={`/ad-space/${booking.space?._id}`} className="text-sm text-slate-400 hover:text-white underline">
                        Space: {booking.space?.title}
                      </Link>
                    </div>
                    <div className="px-3 py-1 bg-white/10 rounded-full text-xs font-bold uppercase tracking-wider">
                      Status: <span className="text-orange-400">{booking.status}</span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    <div>
                      <div className="text-xs text-slate-500 uppercase">Start Date</div>
                      <div>{new Date(booking.campaign?.startDate).toLocaleDateString()}</div>
                    </div>
                    <div>
                      <div className="text-xs text-slate-500 uppercase">End Date</div>
                      <div>{new Date(booking.campaign?.endDate).toLocaleDateString()}</div>
                    </div>
                    <div>
                      <div className="text-xs text-slate-500 uppercase">Budget</div>
                      <div>₹{booking.campaign?.budget}</div>
                    </div>
                    <div>
                      <div className="text-xs text-slate-500 uppercase">Amount Due</div>
                      <div className="font-bold text-emerald-400">₹{booking.pricing?.total}</div>
                    </div>
                  </div>

                  {/* Actions based on status */}
                  <div className="pt-4 border-t border-white/10 flex gap-4">
                    {booking.status === 'payment_pending' && (
                      <button onClick={() => handlePayment(booking._id)} className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-bold flex items-center gap-2">
                        <FiCreditCard /> Pay ₹{booking.pricing?.total}
                      </button>
                    )}
                    
                    {booking.status === 'paid' && (
                      <div>
                        {activeUpload === booking._id ? (
                          <form onSubmit={(e) => handleUploadCreatives(e, booking._id)} className="flex items-center gap-2">
                            <input type="file" multiple accept="image/*,video/*" onChange={e=>setFiles(e.target.files)} className="text-sm" />
                            <button type="submit" className="px-3 py-1 bg-orange-600 text-white rounded text-sm">Upload</button>
                            <button type="button" onClick={() => setActiveUpload(null)} className="px-3 py-1 bg-slate-700 text-white rounded text-sm">Cancel</button>
                          </form>
                        ) : (
                          <button onClick={() => setActiveUpload(booking._id)} className="px-4 py-2 bg-orange-600 hover:bg-orange-500 text-white rounded-lg font-bold flex items-center gap-2">
                            <FiUpload /> Upload Ad Creatives
                          </button>
                        )}
                      </div>
                    )}

                    {['ad_uploaded', 'admin_verified', 'live'].includes(booking.status) && (
                      <div className="text-sm text-slate-400 flex items-center gap-2">
                        <FiUpload className="text-emerald-500" /> Creatives uploaded ({booking.creatives?.length} files)
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </PageTransition>
  )
}
export default AdSpaceAdvertiserDashboard
