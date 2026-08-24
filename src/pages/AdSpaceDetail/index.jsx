import { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { adSpaceAPI, adBookingAPI } from '../../utils/adApi'
import { useAdAuth } from '../../context/AdAuthContext'
import SEOHead from '../../components/common/SEOHead'
import PageTransition from '../../components/common/PageTransition'
import { FiMapPin, FiMaximize, FiDollarSign, FiUsers } from 'react-icons/fi'

const AdSpaceDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { adUser } = useAdAuth()
  const [space, setSpace] = useState(null)
  const [loading, setLoading] = useState(true)
  const [booking, setBooking] = useState({ campaignName: '', startDate: '', endDate: '', budget: '' })
  const [showBookingForm, setShowBookingForm] = useState(false)
  const [bookingLoading, setBookingLoading] = useState(false)
  const [bookingSuccess, setBookingSuccess] = useState(false)
  const [bookingError, setBookingError] = useState('')

  useEffect(() => {
    const fetchSpace = async () => {
      try {
        const res = await adSpaceAPI.getById(id)
        if (res.success) {
          setSpace(res.data)
        }
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }
    fetchSpace()
  }, [id])

  const handleBooking = async (e) => {
    e.preventDefault()
    setBookingLoading(true)
    setBookingError('')
    try {
      const res = await adBookingAPI.create({
        spaceId: id,
        campaignName: booking.campaignName,
        startDate: booking.startDate,
        endDate: booking.endDate,
        budget: booking.budget,
      })
      if (res.success) {
        setBookingSuccess(true)
        setShowBookingForm(false)
      }
    } catch (err) {
      setBookingError(err.message || 'Booking failed. Please try again.')
    } finally {
      setBookingLoading(false)
    }
  }

  const handleBookClick = () => {
    if (!adUser) return navigate('/ad-space/advertiser/login')
    if (adUser.role === 'owner') return navigate('/ad-space/owner/dashboard')
    setShowBookingForm(true)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex justify-center items-center">
        <div className="spinner" />
      </div>
    )
  }

  if (!space) {
    return (
      <div className="min-h-screen bg-black flex justify-center items-center text-white">
        <h2>Ad Space not found</h2>
      </div>
    )
  }

  return (
    <PageTransition>
      <SEOHead title={`${space.title} — ADVMEN`} description={space.description} />

      <div className="min-h-screen bg-black pt-32 pb-24 text-white">
        <div className="container mx-auto px-4 max-w-6xl">
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="px-3 py-1 bg-orange-500/20 text-orange-400 text-xs font-bold rounded-full border border-orange-500/30 uppercase tracking-wider">
                  {space.spaceType}
                </span>
                <span className="px-3 py-1 bg-white/5 text-slate-300 text-xs font-bold rounded-full border border-white/10 uppercase tracking-wider">
                  {space.status}
                </span>
              </div>
              <h1 className="text-4xl font-display font-bold text-white mb-2">{space.title}</h1>
              <div className="flex items-center gap-2 text-slate-400 text-sm">
                <FiMapPin className="text-orange-500" />
                {space.location?.address}, {space.location?.city}, {space.location?.state}
              </div>
            </div>
            <button 
              onClick={handleBookClick}
              className="px-6 py-3 bg-orange-600 hover:bg-orange-500 text-white font-bold rounded-xl transition-colors shadow-lg shadow-orange-600/20"
            >
              {adUser?.role === 'advertiser' ? 'Book This Space' : 'Login to Book'}
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Gallery & Description */}
            <div className="lg:col-span-2 space-y-8">
              {/* Main Image */}
              <div className="w-full h-[400px] md:h-[500px] rounded-2xl overflow-hidden bg-white/5 border border-white/10">
                <img 
                  src={space.photos?.[0] || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&h=800&fit=crop'} 
                  alt={space.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Description */}
              <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                <h3 className="text-xl font-bold mb-4 border-b border-white/10 pb-4">About this Space</h3>
                <p className="text-slate-300 text-sm leading-relaxed whitespace-pre-wrap">
                  {space.description}
                </p>
              </div>

              {/* Map Placeholder */}
              <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                <h3 className="text-xl font-bold mb-4">Location</h3>
                <div className="w-full h-64 bg-slate-800 rounded-xl flex items-center justify-center text-slate-500">
                  Interactive Map Placeholder
                </div>
              </div>
            </div>

            {/* Right Column - Details */}
            <div className="space-y-6">
              {/* Pricing */}
              <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2"><FiDollarSign className="text-orange-500" /> Pricing</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b border-white/10">
                    <span className="text-slate-400 text-sm">Monthly</span>
                    <span className="font-mono font-bold text-emerald-400">₹{space.pricing?.monthly}</span>
                  </div>
                  {space.pricing?.weekly && (
                    <div className="flex justify-between items-center py-2 border-b border-white/10">
                      <span className="text-slate-400 text-sm">Weekly</span>
                      <span className="font-mono font-bold text-emerald-400">₹{space.pricing?.weekly}</span>
                    </div>
                  )}
                  {space.pricing?.daily && (
                    <div className="flex justify-between items-center py-2">
                      <span className="text-slate-400 text-sm">Daily</span>
                      <span className="font-mono font-bold text-emerald-400">₹{space.pricing?.daily}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Dimensions */}
              <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2"><FiMaximize className="text-orange-500" /> Dimensions</h3>
                <div className="flex items-center gap-4">
                  <div className="text-center p-4 bg-black rounded-xl border border-white/10 flex-1">
                    <div className="text-xs text-slate-500 uppercase font-mono mb-1">Width</div>
                    <div className="font-bold">{space.dimensions?.width} {space.dimensions?.unit}</div>
                  </div>
                  <div className="text-center p-4 bg-black rounded-xl border border-white/10 flex-1">
                    <div className="text-xs text-slate-500 uppercase font-mono mb-1">Height</div>
                    <div className="font-bold">{space.dimensions?.height} {space.dimensions?.unit}</div>
                  </div>
                </div>
              </div>

              {/* Audience */}
              <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2"><FiUsers className="text-orange-500" /> Audience</h3>
                <div className="space-y-4">
                  <div>
                    <div className="text-xs text-slate-500 uppercase font-mono mb-1">Estimated Daily Traffic</div>
                    <div className="font-bold text-lg">{space.audience?.dailyTraffic?.toLocaleString() || 'N/A'}</div>
                  </div>
                  <div>
                    <div className="text-xs text-slate-500 uppercase font-mono mb-1">Demographics</div>
                    <div className="text-sm text-slate-300">{space.audience?.demographics || 'N/A'}</div>
                  </div>
                </div>
              </div>

              {/* Calendar placeholder */}
              <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                <h3 className="text-lg font-bold mb-4">Availability</h3>
                <div className="text-sm text-slate-400">Select dates when booking to confirm availability.</div>
              </div>

              {/* Booking Form */}
              {bookingSuccess && (
                <div className="p-4 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 text-sm font-bold">
                  ✅ Booking request sent! Owner will review and approve it.
                </div>
              )}

              {showBookingForm && !bookingSuccess && (
                <div className="p-6 rounded-2xl bg-white/5 border border-orange-500/30">
                  <h3 className="text-lg font-bold mb-4 text-orange-400">Book This Space</h3>
                  {bookingError && (
                    <div className="mb-3 p-3 bg-red-500/20 border border-red-500/40 text-red-400 text-xs rounded-lg">{bookingError}</div>
                  )}
                  <form onSubmit={handleBooking} className="space-y-3">
                    <div>
                      <label className="block text-xs text-slate-400 mb-1">Campaign Name</label>
                      <input required value={booking.campaignName} onChange={e => setBooking({...booking, campaignName: e.target.value})} className="w-full bg-black border border-white/20 rounded-xl px-3 py-2 text-sm text-white focus:border-orange-500 outline-none" />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs text-slate-400 mb-1">Start Date</label>
                        <input required type="date" value={booking.startDate} onChange={e => setBooking({...booking, startDate: e.target.value})} className="w-full bg-black border border-white/20 rounded-xl px-3 py-2 text-sm text-white focus:border-orange-500 outline-none" />
                      </div>
                      <div>
                        <label className="block text-xs text-slate-400 mb-1">End Date</label>
                        <input required type="date" value={booking.endDate} onChange={e => setBooking({...booking, endDate: e.target.value})} className="w-full bg-black border border-white/20 rounded-xl px-3 py-2 text-sm text-white focus:border-orange-500 outline-none" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs text-slate-400 mb-1">Budget (₹)</label>
                      <input type="number" value={booking.budget} onChange={e => setBooking({...booking, budget: e.target.value})} className="w-full bg-black border border-white/20 rounded-xl px-3 py-2 text-sm text-white focus:border-orange-500 outline-none" />
                    </div>
                    <div className="flex gap-2 pt-2">
                      <button type="submit" disabled={bookingLoading} className="flex-1 py-2.5 bg-orange-600 hover:bg-orange-500 text-white font-bold rounded-xl text-sm disabled:opacity-50">
                        {bookingLoading ? 'Sending...' : 'Send Booking Request'}
                      </button>
                      <button type="button" onClick={() => setShowBookingForm(false)} className="px-4 py-2.5 bg-white/10 text-white rounded-xl text-sm hover:bg-white/20">
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              )}

            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  )
}

export default AdSpaceDetail
