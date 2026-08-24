import axios from 'axios'
import { API_BASE_URL } from './constants'

const adApi = axios.create({
  baseURL: `${API_BASE_URL}/api`,
  withCredentials: true, // Crucial for sending/receiving httpOnly cookies
})

// Handle responses/errors globally
adApi.interceptors.response.use(
  (response) => response.data,
  (error) => {
    // If unauthorized, could dispatch a logout event, but for now just pass the error
    return Promise.reject(error.response?.data || error.message)
  }
)

export const adAuthAPI = {
  register: (data) => adApi.post('/ad-auth/register', data),
  login: (data) => adApi.post('/ad-auth/login', data),
  logout: () => adApi.post('/ad-auth/logout'),
  getMe: () => adApi.get('/ad-auth/me'),
}

export const adSpaceAPI = {
  getAll: (params) => adApi.get('/ad-spaces', { params }),
  getById: (id) => adApi.get(`/ad-spaces/${id}`),
  create: (formData) => adApi.post('/ad-spaces', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  update: (id, data) => adApi.put(`/ad-spaces/${id}`, data),
  delete: (id) => adApi.delete(`/ad-spaces/${id}`),
  getMine: () => adApi.get('/ad-spaces/mine'),
}

export const adBookingAPI = {
  create: (data) => adApi.post('/ad-bookings', data),
  getMyBookings: () => adApi.get('/ad-bookings/mine'),
  getSpaceBookings: (spaceId) => adApi.get(`/ad-bookings/space/${spaceId}`),
  approve: (id) => adApi.put(`/ad-bookings/${id}/approve`),
  reject: (id) => adApi.put(`/ad-bookings/${id}/reject`),
  createOrder: (id) => adApi.post(`/ad-bookings/${id}/payment/order`),
  verifyPayment: (id, data) => adApi.post(`/ad-bookings/${id}/payment/verify`, data),
  uploadCreatives: (id, formData) => adApi.post(`/ad-bookings/${id}/creatives`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  requestRefund: (id, data) => adApi.post(`/ad-bookings/${id}/refund`, data),
}

export const adAdminAPI = {
  // Admin routes use the main admin auth token (Bearer)
  // We'll attach the token before sending
  getHeaders: () => ({
    Authorization: `Bearer ${localStorage.getItem('advmen_admin_token') || ''}`
  }),
  getStats: () => adApi.get('/ad-admin/stats', { headers: adAdminAPI.getHeaders() }),
  getAllUsers: () => adApi.get('/ad-admin/users', { headers: adAdminAPI.getHeaders() }),
  getAllSpaces: () => adApi.get('/ad-admin/spaces', { headers: adAdminAPI.getHeaders() }),
  getAllBookings: () => adApi.get('/ad-admin/bookings', { headers: adAdminAPI.getHeaders() }),
  getCommission: () => adApi.get('/ad-admin/commission', { headers: adAdminAPI.getHeaders() }),
  updateCommission: (data) => adApi.post('/ad-admin/commission', data, { headers: adAdminAPI.getHeaders() }),
  approveSpace: (id) => adApi.put(`/ad-admin/spaces/${id}/approve`, {}, { headers: adAdminAPI.getHeaders() }),
  rejectSpace: (id) => adApi.put(`/ad-admin/spaces/${id}/reject`, {}, { headers: adAdminAPI.getHeaders() }),
  approveAd: (id) => adApi.put(`/ad-admin/bookings/${id}/approve-ad`, {}, { headers: adAdminAPI.getHeaders() }),
  processRefund: (id) => adApi.put(`/ad-admin/bookings/${id}/refund`, {}, { headers: adAdminAPI.getHeaders() }),
}

export default adApi
