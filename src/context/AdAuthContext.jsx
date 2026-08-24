import { createContext, useContext, useState, useEffect } from 'react'
import { adAuthAPI } from '../utils/adApi'

const AdAuthContext = createContext()

export const AdAuthProvider = ({ children }) => {
  const [adUser, setAdUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    try {
      const res = await adAuthAPI.getMe()
      if (res.success) {
        setAdUser(res.data)
      }
    } catch (error) {
      setAdUser(null)
    } finally {
      setLoading(false)
    }
  }

  const login = async (data) => {
    const res = await adAuthAPI.login(data)
    if (res.success) {
      setAdUser(res.data)
    }
    return res
  }

  const register = async (data) => {
    const res = await adAuthAPI.register(data)
    if (res.success) {
      setAdUser(res.data)
    }
    return res
  }

  const logout = async () => {
    try {
      await adAuthAPI.logout()
    } finally {
      setAdUser(null)
      // Redirect handled in UI
    }
  }

  return (
    <AdAuthContext.Provider value={{ adUser, loading, login, register, logout, checkAuth }}>
      {!loading && children}
    </AdAuthContext.Provider>
  )
}

export const useAdAuth = () => useContext(AdAuthContext)
