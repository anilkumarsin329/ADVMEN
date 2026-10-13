import { Component } from 'react'

/**
 * ErrorBoundary — keeps one broken page from blanking the whole site.
 * Pass resetKey (e.g. the pathname) so navigating away clears the error.
 */
class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, resetKey: props.resetKey }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  static getDerivedStateFromProps(props, state) {
    if (props.resetKey !== state.resetKey) return { hasError: false, resetKey: props.resetKey }
    return null
  }

  componentDidCatch(error, info) {
    console.error('[ErrorBoundary]', error, info?.componentStack)
  }

  render() {
    if (!this.state.hasError) return this.props.children
    return (
      <div
        role="alert"
        style={{
          minHeight: '70vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '1rem',
          padding: '6rem 1.5rem',
          textAlign: 'center',
        }}
      >
        <h1 style={{ fontSize: 'clamp(1.75rem, 5vw, 2.5rem)' }}>Something went wrong on this page</h1>
        <p style={{ maxWidth: '460px' }}>
          Please refresh, or head back to the home page and try again.
        </p>
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', justifyContent: 'center' }}>
          <button className="btn-primary" onClick={() => window.location.reload()}>Refresh</button>
          <a className="btn-outline" href="/">Go Home</a>
        </div>
      </div>
    )
  }
}

export default ErrorBoundary
