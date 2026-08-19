/**
 * admin/context/AdminAuthContext.jsx
 * ─────────────────────────────────────────────────────────────
 * ADVMEN Technologies — Admin Auth Context
 * ─────────────────────────────────────────────────────────────
 */

import { createContext, useContext, useReducer, useEffect } from 'react'
import { API_BASE_URL } from '@utils/constants'

const AdminAuthContext = createContext(null)

const initialState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: true,
}

const adminAuthReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: true,
        isLoading: false,
      }
    case 'LOGOUT':
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false,
      }
    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload,
      }
    default:
      return state
  }
}

export const AdminAuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(adminAuthReducer, initialState)

  useEffect(() => {
    const verifySession = async () => {
      const storedToken = localStorage.getItem('advmen_admin_token')
      if (!storedToken) {
        dispatch({ type: 'SET_LOADING', payload: false })
        return
      }

      // Mock token check removed

      try {
        const response = await fetch(`${API_BASE_URL}/api/admin/me`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${storedToken}`,
          },
        })

        if (response.ok) {
          const data = await response.json()
          dispatch({ type: 'LOGIN', payload: { user: data.user, token: storedToken } })
        } else if (response.status === 401 || response.status === 403) {
          // Explicit token rejection -> log out
          localStorage.removeItem('advmen_admin_token')
          dispatch({ type: 'LOGOUT' })
        } else {
          // Endpoint not implemented (404) or server issue
          console.warn(`verifySession returned status ${response.status}.`)
          localStorage.removeItem('advmen_admin_token')
          dispatch({ type: 'LOGOUT' })
        }
      } catch (err) {
        console.warn('Network error during verifySession:', err)
        // Backend offline or unreachable
        localStorage.removeItem('advmen_admin_token')
        dispatch({ type: 'LOGOUT' })
      } finally {
        dispatch({ type: 'SET_LOADING', payload: false })
      }
    }

    verifySession()
  }, [])

  const login = async (email, password) => {
    dispatch({ type: 'SET_LOADING', payload: true })
    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })

      if (response.ok) {
        const data = await response.json()
        localStorage.setItem('advmen_admin_token', data.token)
        dispatch({ type: 'LOGIN', payload: { user: data.user, token: data.token } })
        return { success: true }
      } else {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.message || 'Invalid credentials')
      }
    } catch (err) {
      console.warn('API login failed:', err)
      throw new Error(err.message || 'Authentication failed. Incorrect email or password.')
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false })
    }
  }

  const logout = () => {
    localStorage.removeItem('advmen_admin_token')
    dispatch({ type: 'LOGOUT' })
  }

  return (
    <AdminAuthContext.Provider value={{ ...state, login, logout }}>
      {children}
    </AdminAuthContext.Provider>
  )
}

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext)
  if (!context) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider')
  }
  return context
}
