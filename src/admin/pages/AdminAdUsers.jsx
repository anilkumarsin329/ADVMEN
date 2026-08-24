import { useState, useEffect } from 'react'
import { adAdminAPI } from '@utils/adApi'

const AdminAdUsers = () => {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchUsers = async () => {
    setLoading(true)
    try {
      const res = await adAdminAPI.getAllUsers()
      if (res.success) {
        setUsers(res.data)
      }
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="spinner" />
      </div>
    )
  }

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto" style={{ color: "var(--admin-text-primary)" }}>
      <div className="flex justify-between items-center mb-8 border-b pb-6" style={{ background: "var(--admin-bg)", borderColor: `var(--admin-border)` }}>
        <div>
          <h1 className="text-3xl font-bold">Ad Module Users</h1>
          <p className="text-slate-500 mt-2">Manage advertisers and space owners.</p>
        </div>
      </div>

      {users.length === 0 ? (
        <div className="text-center py-20  rounded-2xl border shadow-sm" style={{ background: "var(--admin-bg)", borderColor: `var(--admin-border)` }}>
          <p className="text-slate-400">No users found.</p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-2xl border shadow-sm" style={{ background: "var(--admin-bg)", borderColor: `var(--admin-border)` }}>
          <table className="w-full text-left text-sm" style={{ color: "var(--admin-text-primary)" }}>
            <thead className="text-[9px] uppercase tracking-wider bg-[rgba(0,0,0,0.02)] text-slate-500 border-b" style={{ background: "var(--admin-bg)", borderColor: `var(--admin-border)` }}>
              <tr>
                <th className="px-3 py-3 lg:px-4">Name</th>
                <th className="px-3 py-3 lg:px-4">Email</th>
                <th className="px-3 py-3 lg:px-4">Phone</th>
                <th className="px-3 py-3 lg:px-4">Role</th>
                <th className="px-3 py-3 lg:px-4 text-right">Earnings</th>
                <th className="px-3 py-3 lg:px-4 text-right">Joined Date</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user._id} className="border-b hover:bg-[rgba(0,0,0,0.01)] transition-colors" style={{ background: "var(--admin-bg)", borderColor: `var(--admin-border)` }}>
                  <td className="px-3 py-3 lg:px-4 font-bold" style={{ color: "var(--admin-text-primary)" }}>{user.name}</td>
                  <td className="px-3 py-3 lg:px-4">{user.email}</td>
                  <td className="px-3 py-3 lg:px-4">{user.phone || '-'}</td>
                  <td className="px-3 py-3 lg:px-4">
                    <span className={`px-2 py-1 text-xs font-bold rounded-md border uppercase ${
                      user.role === 'owner' 
                        ? 'text-orange-400 bg-orange-400/10 border-orange-400/20' 
                        : 'text-blue-400 bg-blue-400/10 border-blue-400/20'
                    }`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-3 py-3 lg:px-4 text-right font-mono">
                    {user.role === 'owner' ? (
                      <span className="text-emerald-400 font-bold">₹{user.earnings || 0}</span>
                    ) : '-'}
                  </td>
                  <td className="px-3 py-3 lg:px-4 text-right text-slate-400">
                    {new Date(user.createdAt).toLocaleDateString()}
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

export default AdminAdUsers
