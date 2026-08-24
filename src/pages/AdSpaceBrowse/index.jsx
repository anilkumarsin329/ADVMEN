import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { adSpaceAPI } from '../../utils/adApi'
import { getImageUrl } from '../../utils/constants'
import SEOHead from '../../components/common/SEOHead'
import PageTransition from '../../components/common/PageTransition'
import { FiMapPin, FiFilter, FiDollarSign, FiArrowLeft } from 'react-icons/fi'

const AdSpaceBrowse = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [spaces, setSpaces] = useState([])
  const [loading, setLoading] = useState(true)

  const [filters, setFilters] = useState({
    city: searchParams.get('city') || '',
    spaceType: searchParams.get('type') || '',
    minPrice: searchParams.get('min') || '',
    maxPrice: searchParams.get('max') || '',
  })

  const spaceTypes = ['All', 'Wall', 'Shop/Storefront', 'Building', 'Vehicle', 'Digital Screen', 'Website/App', 'Other']

  const fetchSpaces = async () => {
    setLoading(true)
    try {
      const query = {}
      if (filters.city) query.city = filters.city
      if (filters.spaceType && filters.spaceType !== 'All') query.spaceType = filters.spaceType
      if (filters.minPrice) query.minPrice = filters.minPrice
      if (filters.maxPrice) query.maxPrice = filters.maxPrice

      const res = await adSpaceAPI.getAll(query)
      if (res.success) setSpaces(res.data)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchSpaces()
    // Update URL
    const params = new URLSearchParams()
    if (filters.city) params.set('city', filters.city)
    if (filters.spaceType && filters.spaceType !== 'All') params.set('type', filters.spaceType)
    if (filters.minPrice) params.set('min', filters.minPrice)
    if (filters.maxPrice) params.set('max', filters.maxPrice)
    setSearchParams(params)
    // eslint-disable-next-line
  }, [filters])

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value })
  }

  return (
    <PageTransition>
      <SEOHead title="Browse Ad Spaces — ADVMEN" description="Find the perfect advertising space for your brand." />
      
      <div className="min-h-screen bg-black pt-32 pb-24 text-white">
        <div className="container mx-auto px-4">
          <div className="mb-6">
            <Link to="/ad-space" className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-orange-500 transition-colors font-bold">
              <FiArrowLeft /> Back to Ad Spaces
            </Link>
          </div>
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-display font-bold">Browse Spaces</h1>
            <div className="text-sm text-slate-400">{spaces.length} spaces found</div>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar Filters */}
            <div className="w-full lg:w-1/4">
              <div className="p-6 rounded-2xl bg-white/5 border border-white/10 sticky top-32">
                <div className="flex items-center gap-2 mb-6 text-lg font-bold text-orange-500">
                  <FiFilter /> Filters
                </div>
                
                <div className="mb-5">
                  <label className="block text-xs font-mono uppercase text-slate-400 mb-2">City</label>
                  <input 
                    type="text" 
                    name="city"
                    value={filters.city}
                    onChange={handleFilterChange}
                    placeholder="e.g. Mumbai" 
                    className="w-full bg-black border border-white/20 rounded-xl px-4 py-2.5 text-sm focus:border-orange-500 outline-none transition-colors"
                  />
                </div>

                <div className="mb-5">
                  <label className="block text-xs font-mono uppercase text-slate-400 mb-2">Space Type</label>
                  <select 
                    name="spaceType"
                    value={filters.spaceType}
                    onChange={handleFilterChange}
                    className="w-full bg-black border border-white/20 rounded-xl px-4 py-2.5 text-sm focus:border-orange-500 outline-none transition-colors text-white"
                  >
                    {spaceTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>

                <div className="mb-5">
                  <label className="block text-xs font-mono uppercase text-slate-400 mb-2">Price Range (Monthly)</label>
                  <div className="flex gap-2">
                    <input 
                      type="number" 
                      name="minPrice"
                      value={filters.minPrice}
                      onChange={handleFilterChange}
                      placeholder="Min" 
                      className="w-1/2 bg-black border border-white/20 rounded-xl px-3 py-2 text-sm focus:border-orange-500 outline-none"
                    />
                    <input 
                      type="number" 
                      name="maxPrice"
                      value={filters.maxPrice}
                      onChange={handleFilterChange}
                      placeholder="Max" 
                      className="w-1/2 bg-black border border-white/20 rounded-xl px-3 py-2 text-sm focus:border-orange-500 outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Grid */}
            <div className="w-full lg:w-3/4">
              {loading ? (
                <div className="flex justify-center py-20">
                  <div className="spinner" />
                </div>
              ) : spaces.length === 0 ? (
                <div className="text-center py-20 bg-white/5 border border-white/10 rounded-2xl">
                  <h3 className="text-xl font-bold mb-2">No spaces found</h3>
                  <p className="text-slate-400">Try adjusting your filters.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {spaces.map(space => (
                    <div key={space._id} className="group flex flex-col rounded-2xl bg-white/5 border border-[rgba(255,107,0,0.15)] overflow-hidden hover:border-orange-500/40 transition-colors">
                      <Link to={`/ad-space/${space._id}`} className="block h-48 bg-slate-800 relative overflow-hidden">
                        <img 
                          src={getImageUrl(space.photos?.[0]) || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&h=400&fit=crop&q=80'} 
                          alt={space.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute top-3 right-3 px-3 py-1 bg-black/60 backdrop-blur-md rounded-full text-xs font-bold text-orange-400 border border-orange-500/30">
                          {space.spaceType}
                        </div>
                      </Link>
                      <div className="p-5 flex flex-col flex-grow">
                        <h3 className="font-display font-bold text-lg mb-2 text-white group-hover:text-orange-400 transition-colors line-clamp-1">
                          <Link to={`/ad-space/${space._id}`}>{space.title}</Link>
                        </h3>
                        <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-4">
                          <FiMapPin className="text-orange-500" />
                          <span className="line-clamp-1">{space.location?.city}, {space.location?.state}</span>
                        </div>
                        <div className="mt-auto pt-4 border-t border-white/10 flex items-center justify-between">
                          <div className="flex items-center gap-1 text-emerald-400 font-mono font-bold text-sm">
                            <FiDollarSign /> {space.pricing?.monthly} <span className="text-xs text-slate-500">/mo</span>
                          </div>
                          <Link to={`/ad-space/${space._id}`} className="px-4 py-1.5 bg-orange-600 hover:bg-orange-500 text-white text-xs font-bold rounded-lg transition-colors">
                            Book Now
                          </Link>
                        </div>
                      </div>
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

export default AdSpaceBrowse
