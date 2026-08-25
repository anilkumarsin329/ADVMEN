import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FiBox,
  FiSearch,
  FiEye,
  FiTrash2,
  FiX,
  FiCheck,
  FiAlertCircle,
  FiUser,
  FiMail,
  FiPhone,
  FiBriefcase,
  FiCalendar,
  FiSettings
} from 'react-icons/fi'
import { useAdminAuth } from '@/admin/context/AdminAuthContext'
import { API_BASE_URL, getImageUrl } from '@utils/constants'

const AdminCatalogOrders = () => {
  const { token } = useAdminAuth()
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('All')

  // Modal States
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)
  const [currentOrder, setCurrentOrder] = useState(null)
  
  // Dropdown State
  const [openDropdownId, setOpenDropdownId] = useState(null)
  
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.action-dropdown-container')) {
        setOpenDropdownId(null)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Toast
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' })

  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type })
    setTimeout(() => setToast({ show: false, message: '', type: 'success' }), 3000)
  }

  // Fetch Orders
  const fetchOrders = async () => {
    try {
      const authHeader = token ? { 'Authorization': `Bearer ${token}` } : {}
      const res = await fetch(`${API_BASE_URL}/api/catalog-orders`, { headers: authHeader })
      if (res.ok) {
        const data = await res.json()
        setOrders(data)
      } else {
        console.warn('Failed to fetch orders')
      }
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchOrders()
  }, [])

  // Status Colors
  const getStatusColor = (status) => {
    switch(status) {
      case 'Pending': return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20'
      case 'Contacted': return 'text-blue-400 bg-blue-400/10 border-blue-400/20'
      case 'In Progress': return 'text-purple-400 bg-purple-400/10 border-purple-400/20'
      case 'Completed': return 'text-green-400 bg-green-400/10 border-green-400/20'
      case 'Cancelled': return 'text-red-400 bg-red-400/10 border-red-400/20'
      default: return 'text-gray-400 bg-gray-400/10 border-gray-400/20'
    }
  }

  // Handle Status Change
  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const authHeader = token ? { 'Authorization': `Bearer ${token}` } : {}
      const res = await fetch(`${API_BASE_URL}/api/catalog-orders/${orderId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          ...authHeader
        },
        body: JSON.stringify({ status: newStatus })
      })

      if (res.ok) {
        setOrders(orders.map(o => o._id === orderId ? { ...o, status: newStatus } : o))
        showToast('Order status updated successfully')
        if (currentOrder && currentOrder._id === orderId) {
          setCurrentOrder({ ...currentOrder, status: newStatus })
        }
      }
    } catch (err) {
      console.error(err)
      showToast('Failed to update status', 'error')
    }
  }

  // Handle Delete
  const handleDelete = async (orderId) => {
    if (!window.confirm('Are you sure you want to delete this order?')) return

    try {
      const authHeader = token ? { 'Authorization': `Bearer ${token}` } : {}
      const res = await fetch(`${API_BASE_URL}/api/catalog-orders/${orderId}`, {
        method: 'DELETE',
        headers: authHeader
      })

      if (res.ok) {
        setOrders(orders.filter(o => o._id !== orderId))
        showToast('Order deleted successfully')
        setIsViewModalOpen(false)
      }
    } catch (err) {
      console.error(err)
      showToast('Failed to delete order', 'error')
    }
  }

  const filteredOrders = orders.filter(o => {
    const matchesSearch = o.clientName?.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          o.clientEmail?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = selectedStatus === 'All' || o.status === selectedStatus
    return matchesSearch && matchesStatus
  })

  return (
    <div className="flex flex-col w-full gap-6 pb-10">
      
      {/* Header */}
      <header className="shrink-0 py-6 border-b flex items-center justify-between bg-transparent z-10" style={{ borderColor: 'var(--admin-border)' }}>
        <div>
          <h1 className="text-xl md:text-2xl font-bold font-display tracking-wide flex items-center gap-3 text-[var(--admin-text-primary)]">
            <FiBox className="text-[var(--color-orange)]" />
            CATALOG ORDERS
          </h1>
          <p className="text-xs font-mono text-[var(--admin-text-secondary)] mt-1 tracking-wider uppercase">
            Manage incoming client bookings
          </p>
        </div>
      </header>

      <div className="flex flex-col gap-6 relative">
        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1 max-w-md">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--admin-text-tertiary)]" size={18} />
            <input
              type="text"
              placeholder="Search by client name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-[var(--admin-surface)] border rounded-xl text-sm font-body focus:outline-none focus:border-[var(--color-orange)] transition-colors text-[var(--admin-text-primary)]"
              style={{ borderColor: 'var(--admin-border)' }}
            />
          </div>
          
          <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0 scrollbar-hide">
            {['All', 'Pending', 'Contacted', 'In Progress', 'Completed', 'Cancelled'].map(status => (
              <button
                key={status}
                onClick={() => setSelectedStatus(status)}
                className={`px-4 py-2.5 rounded-xl border text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all ${
                  selectedStatus === status
                    ? 'bg-[var(--color-orange)] border-[var(--color-orange)] text-white shadow-lg shadow-orange-500/20'
                    : 'bg-[var(--admin-surface)] text-[var(--admin-text-secondary)] hover:bg-[var(--admin-bg)]'
                }`}
                style={{ borderColor: selectedStatus === status ? 'var(--color-orange)' : 'var(--admin-border)' }}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        {/* Orders Table */}
        <div className="w-full border rounded-2xl bg-[var(--admin-surface)] flex flex-col shadow-sm overflow-hidden" style={{ borderColor: 'var(--admin-border)' }}>
          {loading ? (
            <div className="flex-1 flex flex-col items-center justify-center text-[var(--admin-text-tertiary)] gap-4">
              <div className="w-8 h-8 rounded-full border-2 border-t-[var(--color-orange)] border-r-[var(--color-orange)] border-b-transparent border-l-transparent animate-spin" />
              <p className="text-xs font-mono uppercase tracking-widest">Loading orders...</p>
            </div>
          ) : filteredOrders.length === 0 ? (
             <div className="flex-1 flex flex-col items-center justify-center text-[var(--admin-text-tertiary)] gap-3">
               <FiBox size={32} className="opacity-50" />
               <p className="text-sm font-body">No orders found.</p>
             </div>
          ) : (
            <div className="w-full overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead className="sticky top-0 bg-[var(--admin-surface)] z-10 shadow-sm">
                  <tr>
                    <th className="p-4 md:p-5 text-[10px] font-mono uppercase tracking-wider text-[var(--admin-text-tertiary)] font-bold border-b w-12" style={{ borderColor: 'var(--admin-border)' }}>#</th>
                    <th className="p-4 md:p-5 text-[10px] font-mono uppercase tracking-wider text-[var(--admin-text-tertiary)] font-bold border-b" style={{ borderColor: 'var(--admin-border)' }}>Client</th>
                    <th className="p-4 md:p-5 text-[10px] font-mono uppercase tracking-wider text-[var(--admin-text-tertiary)] font-bold border-b hidden sm:table-cell" style={{ borderColor: 'var(--admin-border)' }}>Order Items</th>
                    <th className="p-4 md:p-5 text-[10px] font-mono uppercase tracking-wider text-[var(--admin-text-tertiary)] font-bold border-b" style={{ borderColor: 'var(--admin-border)' }}>Amount</th>
                    <th className="p-4 md:p-5 text-[10px] font-mono uppercase tracking-wider text-[var(--admin-text-tertiary)] font-bold border-b hidden md:table-cell" style={{ borderColor: 'var(--admin-border)' }}>Date</th>
                    <th className="p-4 md:p-5 text-[10px] font-mono uppercase tracking-wider text-[var(--admin-text-tertiary)] font-bold border-b" style={{ borderColor: 'var(--admin-border)' }}>Status</th>
                    <th className="p-4 md:p-5 text-[10px] font-mono uppercase tracking-wider text-[var(--admin-text-tertiary)] font-bold border-b text-right" style={{ borderColor: 'var(--admin-border)' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOrders.map((order, index) => (
                    <tr key={order._id} className="group hover:bg-[var(--admin-bg)] transition-colors border-b last:border-b-0" style={{ borderColor: 'var(--admin-border)' }}>
                      <td className="p-4 md:p-5 text-xs text-[var(--admin-text-secondary)] font-mono font-bold">
                        {(index + 1).toString().padStart(2, '0')}
                      </td>
                      <td className="p-4 md:p-5">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-[var(--color-orange)]/10 text-[var(--color-orange)] flex items-center justify-center font-bold font-display shrink-0">
                            {order.clientName?.charAt(0).toUpperCase()}
                          </div>
                          <div className="min-w-0">
                            <p className="text-sm font-bold text-[var(--admin-text-primary)] truncate">{order.clientName}</p>
                            <p className="text-xs text-[var(--admin-text-secondary)] truncate">{order.clientEmail}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4 md:p-5 hidden sm:table-cell">
                        <div className="flex items-center gap-3">
                          {order.items?.[0]?.catalogItemId?.image && (
                            <img 
                              src={getImageUrl(order.items[0].catalogItemId.image)} 
                              alt="Item" 
                              className="w-10 h-10 rounded object-cover border"
                              style={{ borderColor: 'var(--admin-border)' }}
                            />
                          )}
                          <div className="flex flex-col">
                            <span className="text-xs font-bold text-[var(--admin-text-primary)]">{order.items.length} Package(s)</span>
                            <span className="text-[10px] text-[var(--admin-text-tertiary)] truncate max-w-[150px]">{order.items.map(i => i.name).join(', ')}</span>
                          </div>
                        </div>
                      </td>
                      <td className="p-4 md:p-5 text-sm font-bold text-[var(--admin-text-primary)] font-mono">
                        ₹{order.totalAmount?.toLocaleString()}
                      </td>
                      <td className="p-4 md:p-5 text-xs text-[var(--admin-text-secondary)] hidden md:table-cell">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </td>
                      <td className="p-4 md:p-5">
                         <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider border ${getStatusColor(order.status)}`}>
                           {order.status}
                         </span>
                      </td>
                      <td className="p-4 md:p-5 text-right">
                        <div className="relative inline-block text-left action-dropdown-container">
                          <button
                            onClick={() => setOpenDropdownId(openDropdownId === order._id ? null : order._id)}
                            className="w-8 h-8 rounded-lg border bg-[var(--admin-surface)] text-[var(--admin-text-secondary)] hover:text-[var(--color-orange)] hover:border-[var(--color-orange)] transition-colors flex items-center justify-center ml-auto"
                            style={{ borderColor: 'var(--admin-border)' }}
                          >
                            <FiSettings size={14} />
                          </button>
                          
                          <AnimatePresence>
                            {openDropdownId === order._id && (
                              <motion.div
                                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                transition={{ duration: 0.15 }}
                                className="absolute right-0 mt-2 w-32 rounded-xl border bg-[var(--admin-surface)] shadow-lg z-50 overflow-hidden"
                                style={{ borderColor: 'var(--admin-border)' }}
                              >
                                <div className="py-2 flex flex-col">
                                  <button
                                    onClick={() => {
                                      handleStatusChange(order._id, 'In Progress')
                                      setOpenDropdownId(null)
                                    }}
                                    className="w-full text-left px-4 py-2 text-xs font-bold text-green-500 hover:bg-[var(--admin-bg)] transition-colors"
                                  >
                                    Approve
                                  </button>
                                  <button
                                    onClick={() => {
                                      handleStatusChange(order._id, 'Cancelled')
                                      setOpenDropdownId(null)
                                    }}
                                    className="w-full text-left px-4 py-2 text-xs font-bold text-red-500 hover:bg-[var(--admin-bg)] transition-colors"
                                  >
                                    Reject
                                  </button>
                                  <button
                                    onClick={() => {
                                      setCurrentOrder(order)
                                      setIsViewModalOpen(true)
                                      setOpenDropdownId(null)
                                    }}
                                    className="w-full text-left px-4 py-2 text-xs font-bold text-[var(--admin-text-primary)] hover:bg-[var(--admin-bg)] transition-colors"
                                  >
                                    View
                                  </button>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* View Modal */}
      <AnimatePresence>
        {isViewModalOpen && currentOrder && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6">
            <motion.div
              className="absolute inset-0 bg-black/50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsViewModalOpen(false)}
            />
            
            <motion.div
              className="relative w-full max-w-xl bg-white rounded-2xl flex flex-col max-h-full overflow-hidden shadow-2xl"
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
            >
               {/* Modal Header */}
               <div className="p-5 md:p-6 border-b border-gray-100 shrink-0 bg-white flex justify-between items-start">
                 <div>
                   <div className="text-[var(--color-orange)] text-[10px] font-bold tracking-widest uppercase mb-1">
                     Order Details
                   </div>
                   <h2 className="text-xl md:text-2xl font-black text-gray-900 font-display uppercase tracking-wide">
                     {currentOrder.clientName}
                   </h2>
                 </div>
                 <button onClick={() => setIsViewModalOpen(false)} className="text-gray-400 hover:text-gray-900 transition-colors mt-1">
                   <FiX size={24} />
                 </button>
               </div>

               {/* Modal Body */}
               <div className="flex-1 overflow-y-auto p-5 md:p-6 custom-scrollbar bg-white">
                 
                 {/* Image Banner */}
                 {currentOrder.items?.[0]?.catalogItemId?.image && (
                   <div className="w-full h-48 rounded-xl overflow-hidden mb-6 bg-gray-100 border border-gray-200">
                     <img 
                       src={getImageUrl(currentOrder.items[0].catalogItemId.image)} 
                       alt="Catalog Item" 
                       className="w-full h-full object-cover"
                     />
                   </div>
                 )}

                 {/* Grid for top info */}
                 <div className="grid grid-cols-2 gap-6 mb-8">
                   <div>
                     <h3 className="text-[10px] font-mono uppercase tracking-widest font-bold text-gray-500 mb-1">Order Status</h3>
                     <div className={`inline-flex px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider border ${getStatusColor(currentOrder.status)} mt-1`}>
                       {currentOrder.status}
                     </div>
                   </div>
                   <div>
                     <h3 className="text-[10px] font-mono uppercase tracking-widest font-bold text-gray-500 mb-1">Order Date</h3>
                     <p className="font-bold text-sm text-gray-900">{new Date(currentOrder.createdAt).toLocaleString()}</p>
                   </div>
                   
                   <div>
                     <h3 className="text-[10px] font-mono uppercase tracking-widest font-bold text-gray-500 mb-1">Client Email</h3>
                     <p className="font-bold text-sm flex items-center gap-2 text-gray-900">
                       <a href={`mailto:${currentOrder.clientEmail}`} className="hover:text-[var(--color-orange)]">{currentOrder.clientEmail}</a>
                     </p>
                   </div>
                   <div>
                     <h3 className="text-[10px] font-mono uppercase tracking-widest font-bold text-gray-500 mb-1">Client Phone</h3>
                     <p className="font-bold text-sm text-gray-900">{currentOrder.clientPhone}</p>
                   </div>

                   {currentOrder.clientCompany && (
                     <div className="col-span-2">
                       <h3 className="text-[10px] font-mono uppercase tracking-widest font-bold text-gray-500 mb-1">Company</h3>
                       <p className="font-bold text-sm text-gray-900">{currentOrder.clientCompany}</p>
                     </div>
                   )}
                 </div>

                 <div className="border-t border-gray-100 mb-6"></div>

                 {/* Requirements */}
                 <div className="mb-8">
                   <h3 className="text-[10px] font-mono uppercase tracking-widest font-bold text-gray-500 mb-2">Project Requirements</h3>
                   <p className="text-sm leading-relaxed whitespace-pre-wrap text-gray-900">
                     {currentOrder.requirements || 'No specific requirements provided.'}
                   </p>
                 </div>

                 {/* Items */}
                 <div>
                   <div className="flex justify-between items-end mb-4">
                     <h3 className="text-[10px] font-mono uppercase tracking-widest font-bold text-gray-500">Packages Ordered</h3>
                     <div className="text-right">
                       <span className="text-[10px] font-mono uppercase tracking-widest font-bold text-gray-500 block mb-1">Total Amount</span>
                       <span className="text-xl font-black font-mono text-[var(--color-orange)]">₹{currentOrder.totalAmount?.toLocaleString()}</span>
                     </div>
                   </div>
                   
                   <div className="border border-gray-200 rounded-xl overflow-hidden">
                     {currentOrder.items.map((item, idx) => (
                       <div key={idx} className="flex justify-between items-center p-4 bg-gray-50 border-b border-gray-200 last:border-b-0">
                         <div className="flex flex-col">
                           <span className="font-bold text-sm text-gray-900">{item.name}</span>
                           <span className="text-xs text-gray-500 mt-1">Qty: {item.quantity}</span>
                         </div>
                         <span className="font-mono font-bold text-gray-900">₹{(item.price * item.quantity).toLocaleString()}</span>
                       </div>
                     ))}
                   </div>
                 </div>

               </div>

               {/* Modal Footer */}
               <div className="p-5 md:p-6 border-t border-gray-100 bg-white shrink-0 flex flex-col sm:flex-row items-center justify-between gap-4">
                 
                 <div className="flex items-center gap-3 w-full sm:w-auto">
                   <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Update Status:</span>
                   <select 
                     value={currentOrder.status}
                     onChange={(e) => handleStatusChange(currentOrder._id, e.target.value)}
                     className="bg-white border border-gray-200 rounded-lg px-3 py-2 text-xs font-bold text-gray-900 uppercase tracking-wider focus:outline-none focus:border-[var(--color-orange)]"
                   >
                     {['Pending', 'Contacted', 'In Progress', 'Completed', 'Cancelled'].map(s => (
                       <option key={s} value={s}>{s}</option>
                     ))}
                   </select>
                 </div>

                 <div className="flex gap-3 w-full sm:w-auto">
                   <button 
                     onClick={() => handleDelete(currentOrder._id)}
                     className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl border border-red-500/30 text-red-500 hover:bg-red-500 hover:text-white transition-colors text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2"
                   >
                     <FiTrash2 size={16} /> Delete
                   </button>
                   <button 
                     onClick={() => setIsViewModalOpen(false)}
                     className="flex-1 sm:flex-none px-8 py-2.5 rounded-xl bg-[var(--color-orange)] text-white hover:bg-[#ff7a00] transition-colors text-xs font-bold uppercase tracking-widest"
                   >
                     Close View
                   </button>
                 </div>
               </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Toast Notification */}
      <AnimatePresence>
        {toast.show && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3 rounded-xl shadow-2xl border"
            style={{ 
              backgroundColor: toast.type === 'error' ? 'var(--admin-bg)' : 'var(--color-orange)',
              borderColor: toast.type === 'error' ? 'rgba(239,68,68,0.3)' : 'transparent',
              color: 'white' 
            }}
          >
            {toast.type === 'success' ? <FiCheck size={18} /> : <FiAlertCircle size={18} className="text-red-500" />}
            <p className="text-sm font-bold">{toast.message}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default AdminCatalogOrders
