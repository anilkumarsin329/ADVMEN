/**
 * loadRazorpay.js
 * Dynamic loader for Razorpay Checkout SDK.
 * Prevents loading third-party payment scripts on initial page load.
 */

export const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    if (typeof window === 'undefined') return resolve(false)
    if (window.Razorpay) {
      return resolve(true)
    }
    const script = document.createElement('script')
    script.src = 'https://checkout.razorpay.com/v1/checkout.js'
    script.async = true
    script.onload = () => resolve(true)
    script.onerror = () => resolve(false)
    document.body.appendChild(script)
  })
}
