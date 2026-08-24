import { useState, useEffect } from 'react'
import { adAdminAPI } from '@utils/adApi'
import { FiSettings, FiEye, FiCheckCircle, FiXCircle, FiX } from 'react-icons/fi'
import { getImageUrl } from '@utils/constants'

const AdminAdSpaces = () => {
  const [spaces, setSpaces] = useState([])
  const [loading, setLoading] = useState(true)
  const [toast, setToast] = useState(null)
  const [openActionDropdown, setOpenActionDropdown] = useState(null)
  const [viewModalData, setViewModalData] = useState(null)

  const toggleDropdown = (id) => {
    setOpenActionDropdown(openActionDropdown === id ? null : id)
  }

  const fetchSpaces = async () => {
    setLoading(true)
    try {
      const res = await adAdminAPI.getAllSpaces()
      if (res.success) {
        setSpaces(res.data)
      }
    } catch (err) {
      console.error(err)
      showToast('Failed to load spaces', 'error')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchSpaces()
  }, [])

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type })
    setTimeout(() => setToast(null), 3000)
  }

  const handleApprove = async (id) => {
    try {
      const res = await adAdminAPI.approveSpace(id)
      if (res.success) {
        showToast('Space approved successfully')
        setSpaces(spaces.map(s => s._id === id ? { ...s, isApproved: true, status: 'available' } : s))
      }
    } catch (err) {
      console.error(err)
      showToast('Failed to approve space', 'error')
    }
  }

  const handleReject = async (id) => {
    try {
      const res = await adAdminAPI.rejectSpace(id)
      if (res.success) {
        showToast('Space rejected successfully')
        setSpaces(spaces.map(s => s._id === id ? { ...s, isApproved: false, status: 'rejected' } : s))
      }
    } catch (err) {
      console.error(err)
      showToast('Failed to reject space', 'error')
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'available': return 'text-green-400 bg-green-400/10 border-green-400/20'
      case 'occupied': return 'text-red-400 bg-red-400/10 border-red-400/20'
      case 'pending': return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20'
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
      <div className="flex justify-between items-center mb-8 border-b pb-6" style={{ background: "var(--admin-bg)", borderColor: 'var(--admin-border)' }}>
        <div>
          <h1 className="text-3xl font-bold">Ad Spaces</h1>
          <p className="text-slate-500 mt-2">Manage all advertising spaces listed by owners.</p>
        </div>
      </div>

      {toast && (
        <div className={`mb-6 p-4 rounded-xl border ${toast.type === 'error' ? 'bg-red-500/20 border-red-500/50 text-red-400' : 'bg-emerald-500/20 border-emerald-500/50 text-emerald-400'}`}>
          {toast.msg}
        </div>
      )}

      {spaces.length === 0 ? (
        <div className="text-center py-20  rounded-2xl border shadow-sm" style={{ background: "var(--admin-bg)", borderColor: 'var(--admin-border)' }}>
          <p className="" style={{ color: "var(--admin-text-secondary)" }}>No ad spaces found.</p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-2xl border shadow-sm" style={{ background: "var(--admin-bg)", borderColor: 'var(--admin-border)' }}>
          <table className="w-full text-left text-sm" style={{ color: "var(--admin-text-primary)" }}>
            <thead className="text-[9px] uppercase tracking-wider bg-[rgba(0,0,0,0.02)] text-slate-500 border-b" style={{ background: "var(--admin-bg)", borderColor: 'var(--admin-border)' }}>
              <tr>
                <th className="px-6 py-4">Sr No</th>
                <th className="px-6 py-4">Space Title</th>
                <th className="px-6 py-4">Owner Name</th>
                <th className="px-6 py-4">Space Type</th>
                <th className="px-6 py-4">City</th>
                <th className="px-6 py-4">Monthly Price</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-center">Approved</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {spaces.map((space, index) => (
                <tr key={space._id} className="border-b hover:bg-[rgba(0,0,0,0.01)] transition-colors" style={{ background: "var(--admin-bg)", borderColor: 'var(--admin-border)' }}>
                  <td className="px-6 py-4 font-bold">{index + 1}</td>
                  <td className="px-6 py-4 font-bold" style={{ color: "var(--admin-text-primary)" }}>{space.title}</td>
                  <td className="px-6 py-4">{space.owner?.name || 'Unknown'}</td>
                  <td className="px-6 py-4">{space.spaceType}</td>
                  <td className="px-6 py-4">{space.location?.city}</td>
                  <td className="px-6 py-4 text-emerald-400">₹{space.pricing?.monthly}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs font-bold rounded-md border uppercase ${getStatusColor(space.status)}`}>
                      {space.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    {space.isApproved ? (
                      <span className="text-emerald-400 font-bold">Approved ✓</span>
                    ) : (
                      <span className="text-slate-500 text-xs">Pending</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right relative">
                    <button 
                      onClick={() => toggleDropdown(space._id)}
                      className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors inline-flex items-center justify-center"
                    >
                      <FiSettings size={18} />
                    </button>

                    {openActionDropdown === space._id && (
                      <div 
                        className="absolute right-10 top-12 z-50 w-36 bg-white border shadow-xl rounded-xl overflow-hidden flex flex-col text-left text-sm" 
                        style={{ borderColor: 'var(--admin-border)' }}
                      >
                        <button 
                          onClick={() => { setViewModalData(space); setOpenActionDropdown(null); }}
                          className="flex items-center gap-2 px-4 py-2.5 hover:bg-slate-50 transition-colors text-slate-700"
                        >
                          <FiEye size={14} /> View
                        </button>
                        
                        {!space.isApproved && (
                          <button 
                            onClick={() => { handleApprove(space._id); setOpenActionDropdown(null); }}
                            className="flex items-center gap-2 px-4 py-2.5 hover:bg-emerald-50 text-emerald-600 transition-colors"
                          >
                            <FiCheckCircle size={14} /> Approve
                          </button>
                        )}
                        
                        <button 
                          onClick={() => { handleReject(space._id); setOpenActionDropdown(null); }}
                          className="flex items-center gap-2 px-4 py-2.5 hover:bg-red-50 text-red-600 transition-colors border-t border-slate-100"
                        >
                          <FiXCircle size={14} /> Reject
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* View Modal */}
      {viewModalData && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto" style={{ background: 'var(--admin-bg)', color: 'var(--admin-text-primary)' }}>
            <div className="flex justify-between items-center p-6 border-b" style={{ borderColor: 'var(--admin-border)' }}>
              <h2 className="text-xl font-bold">Space Details</h2>
              <button onClick={() => setViewModalData(null)} className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">
                <FiX size={20} />
              </button>
            </div>
            
            <div className="p-6 space-y-6">
              {viewModalData.photos && viewModalData.photos.length > 0 && (
                <div className="w-full h-64 rounded-xl overflow-hidden bg-slate-100 border" style={{ borderColor: 'var(--admin-border)' }}>
                  <img src={getImageUrl(viewModalData.photos[0])} alt="Space" className="w-full h-full object-cover" />
                </div>
              )}
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--admin-text-secondary)' }}>Title</label>
                  <p className="mt-1 font-medium">{viewModalData.title}</p>
                </div>
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--admin-text-secondary)' }}>Space Type</label>
                  <p className="mt-1 font-medium">{viewModalData.spaceType}</p>
                </div>
                <div className="md:col-span-2">
                  <label className="text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--admin-text-secondary)' }}>Description</label>
                  <p className="mt-1 text-sm">{viewModalData.description}</p>
                </div>
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--admin-text-secondary)' }}>Location</label>
                  <p className="mt-1 text-sm">{viewModalData.location?.address}, {viewModalData.location?.city}, {viewModalData.location?.state}</p>
                </div>
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--admin-text-secondary)' }}>Dimensions</label>
                  <p className="mt-1 text-sm">{viewModalData.dimensions?.width} x {viewModalData.dimensions?.height} {viewModalData.dimensions?.unit}</p>
                </div>
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--admin-text-secondary)' }}>Pricing</label>
                  <p className="mt-1 text-sm font-bold text-emerald-500">₹{viewModalData.pricing?.monthly} / month</p>
                </div>
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--admin-text-secondary)' }}>Status</label>
                  <p className="mt-1 text-sm font-bold uppercase">
                    <span className={getStatusColor(viewModalData.status) + ' px-2 py-1 rounded-md'}>{viewModalData.status}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminAdSpaces
