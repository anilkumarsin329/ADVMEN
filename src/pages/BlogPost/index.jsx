/**
 * pages/BlogPost/index.jsx
 * Blog Post Detail Page
 */

import { useParams, useNavigate, Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import SEOHead from '@components/common/SEOHead'
import PageTransition from '@components/common/PageTransition'
import { getBlogBySlug, blogArticles } from '@data/blog'
import { FiArrowLeft, FiShare2, FiCopy, FiX } from 'react-icons/fi'
import { API_BASE_URL } from '@utils/constants'

const BlogPost = () => {
  const { slug } = useParams()
  const navigate = useNavigate()
  const [article, setArticle] = useState(() => getBlogBySlug(slug))
  const [loading, setLoading] = useState(true)
  const [isImageModalOpen, setIsImageModalOpen] = useState(false)

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/blog/${slug}`)
        if (response.ok) {
          const data = await response.json()
          if (data && data.title) {
            setArticle({ ...data, id: data._id || data.id })
          }
        }
      } catch (err) {
        console.warn('API error fetching post by slug:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchArticle()
  }, [slug])

  useEffect(() => {
    if (!loading && !article) {
      navigate('/404')
    }
  }, [loading, article, navigate])

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setIsImageModalOpen(false)
    }
    if (isImageModalOpen) {
      window.addEventListener('keydown', handleKeyDown)
    }
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isImageModalOpen])

  if (!article) return null

  // Get related articles (same category, different article)
  const relatedArticles = blogArticles
    .filter((a) => a.category === article.category && a.id !== article.id)
    .slice(0, 3)

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href)
    // Toast notification would be better than alert
  }

  return (
    <PageTransition>
      <SEOHead
        title={`${article.title} — ADVMEN Blog`}
        description={article.excerpt}
      />

      {/* Back Button */}
      <div
        style={{
          paddingTop: 'calc(var(--navbar-height) + 2rem)',
          paddingBottom: '2rem',
          background: 'var(--color-black)',
        }}
      >
        <div className="container">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 transition-all duration-300 hover:gap-3"
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.9rem',
              color: 'var(--color-text-secondary)',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
            }}
          >
            <FiArrowLeft size={18} />
            Back to Blog
          </button>
        </div>
      </div>

      {/* Article Header */}
      <section
        style={{
          paddingTop: '2rem',
          paddingBottom: '4rem',
          background: 'var(--color-black)',
        }}
      >
        <div className="container">
          <div className="max-w-3xl">
            {/* Category & Meta */}
            <div className="flex items-center gap-3 mb-4">
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.7rem',
                  color: 'var(--color-orange)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                }}
              >
                {article.category}
              </span>
              <span
                style={{
                  width: '1px',
                  height: '16px',
                  background: 'rgba(255,255,255,0.1)',
                }}
              />
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.7rem',
                  color: 'var(--color-text-tertiary)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                }}
              >
                {article.date} • {article.readTime}
              </span>
            </div>

            {/* Title */}
            <h1
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                fontWeight: 'var(--weight-bold)',
                color: 'var(--color-text-primary)',
                lineHeight: 1.1,
                marginBottom: '1.5rem',
                letterSpacing: '-0.02em',
              }}
            >
              {article.title}
            </h1>

            {/* Author & Share */}
            <div className="flex justify-between items-center pt-4 border-t border-[rgba(255,255,255,0.05)]">
              <div>
                <div
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '0.9rem',
                    fontWeight: 'var(--weight-bold)',
                    color: 'var(--color-text-primary)',
                  }}
                >
                  {article.author}
                </div>
                <div
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.7rem',
                    color: 'var(--color-text-tertiary)',
                    textTransform: 'uppercase',
                  }}
                >
                  Author
                </div>
              </div>

              {/* Share Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={handleCopyLink}
                  className="p-2 rounded-lg transition-all duration-300"
                  style={{
                    background: 'rgba(255,107,0,0.08)',
                    border: '1px solid rgba(255,107,0,0.15)',
                    color: 'var(--color-orange)',
                    cursor: 'pointer',
                  }}
                  title="Copy link"
                >
                  <FiCopy size={18} />
                </button>
                <button
                  className="p-2 rounded-lg transition-all duration-300"
                  style={{
                    background: 'rgba(255,107,0,0.08)',
                    border: '1px solid rgba(255,107,0,0.15)',
                    color: 'var(--color-orange)',
                    cursor: 'pointer',
                  }}
                  title="Share"
                >
                  <FiShare2 size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Image */}
      <section
        style={{
          paddingBottom: '3rem',
          background: 'var(--color-black)',
        }}
      >
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div 
              onClick={() => setIsImageModalOpen(true)}
              className="relative w-full rounded-2xl overflow-hidden border border-[rgba(255,107,0,0.2)] shadow-2xl bg-[#090a0f] flex items-center justify-center p-2 sm:p-4 cursor-pointer group min-h-[240px] max-h-[480px] md:max-h-[520px]"
              title="Click to view full image"
            >
              {/* Ambient blurred glow background */}
              {article.image && (
                <img
                  src={article.image}
                  alt=""
                  aria-hidden="true"
                  className="absolute inset-0 w-full h-full object-cover blur-2xl opacity-25 scale-110 pointer-events-none select-none transition-opacity duration-300 group-hover:opacity-40"
                />
              )}

              {/* Main image with object-contain to prevent cropping */}
              {article.image ? (
                <img
                  src={article.image}
                  alt={article.title}
                  className="relative z-10 w-full h-auto max-h-[450px] md:max-h-[490px] object-contain mx-auto rounded-xl transition-transform duration-300 group-hover:scale-[1.01]"
                />
              ) : (
                <div className="py-16 text-center text-gray-500 font-mono text-sm">No Image Available</div>
              )}

              {/* Hover Badge for zoom hint */}
              <div className="absolute bottom-3 right-3 z-20 px-3 py-1.5 rounded-lg bg-black/70 border border-white/10 text-xs font-mono text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center gap-1.5 pointer-events-none backdrop-blur-md">
                <svg className="w-3.5 h-3.5 text-[var(--color-orange)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                </svg>
                Click to Expand
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section
        style={{
          paddingBottom: '4rem',
          background: 'var(--color-black)',
        }}
      >
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-8">
              <div
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '1rem',
                  color: 'var(--color-text-secondary)',
                  lineHeight: '1.8',
                }}
              >
                {article.content.split('\n\n').map((paragraph, i) => (
                  <p key={i} style={{ marginBottom: '1.5rem', whiteSpace: 'pre-wrap' }}>
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* Tags */}
              <div className="mt-8 pt-8 border-t border-[rgba(255,255,255,0.05)]">
                <div className="flex flex-wrap gap-2">
                  {article.tags.map((tag) => (
                    <span
                      key={tag}
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.7rem',
                        color: 'var(--color-orange)',
                        background: 'rgba(255,107,0,0.08)',
                        border: '1px solid rgba(255,107,0,0.15)',
                        padding: '0.4rem 0.8rem',
                        borderRadius: '4px',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                      }}
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-4">
              {/* Table of Contents */}
              <div
                style={{
                  padding: '1.5rem',
                  borderRadius: '1rem',
                  background: 'rgba(255,255,255,0.01)',
                  border: '1px solid rgba(255,107,0,0.15)',
                  backdropFilter: 'blur(12px)',
                  marginBottom: '2rem',
                }}
              >
                <h3
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.1rem',
                    fontWeight: 'var(--weight-bold)',
                    color: 'var(--color-text-primary)',
                    marginBottom: '1rem',
                  }}
                >
                  Article Info
                </h3>
                <div className="flex flex-col gap-3">
                  <div>
                    <div
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.7rem',
                        color: 'var(--color-text-tertiary)',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                        marginBottom: '0.5rem',
                      }}
                    >
                      Published
                    </div>
                    <div
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '0.9rem',
                        color: 'var(--color-text-primary)',
                      }}
                    >
                      {article.date}
                    </div>
                  </div>
                  <div>
                    <div
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.7rem',
                        color: 'var(--color-text-tertiary)',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                        marginBottom: '0.5rem',
                      }}
                    >
                      Reading Time
                    </div>
                    <div
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '0.9rem',
                        color: 'var(--color-text-primary)',
                      }}
                    >
                      {article.readTime}
                    </div>
                  </div>
                  <div>
                    <div
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.7rem',
                        color: 'var(--color-text-tertiary)',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                        marginBottom: '0.5rem',
                      }}
                    >
                      Category
                    </div>
                    <div
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '0.9rem',
                        color: 'var(--color-text-primary)',
                      }}
                    >
                      {article.category}
                    </div>
                  </div>
                </div>
              </div>

              {/* Related Articles */}
              {relatedArticles.length > 0 && (
                <div
                  style={{
                    padding: '1.5rem',
                    borderRadius: '1rem',
                    background: 'rgba(255,255,255,0.01)',
                    border: '1px solid rgba(255,107,0,0.15)',
                    backdropFilter: 'blur(12px)',
                  }}
                >
                  <h3
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '1.1rem',
                      fontWeight: 'var(--weight-bold)',
                      color: 'var(--color-text-primary)',
                      marginBottom: '1rem',
                    }}
                  >
                    Related Articles
                  </h3>
                  <div className="flex flex-col gap-3">
                    {relatedArticles.map((related) => (
                      <Link
                        key={related.id}
                        to={`/blog/${related.slug}`}
                        className="group p-3 rounded-lg transition-all duration-300 hover:bg-[rgba(255,107,0,0.08)]"
                        style={{
                          background: 'rgba(255,255,255,0.01)',
                          border: '1px solid rgba(255,107,0,0.1)',
                        }}
                      >
                        <div
                          className="group-hover:text-[var(--color-orange)] transition-colors duration-300"
                          style={{
                            fontFamily: 'var(--font-body)',
                            fontSize: '0.85rem',
                            fontWeight: 'var(--weight-semibold)',
                            color: 'var(--color-text-primary)',
                            lineHeight: '1.4',
                          }}
                        >
                          {related.title}
                        </div>
                        <div
                          style={{
                            fontFamily: 'var(--font-mono)',
                            fontSize: '0.65rem',
                            color: 'var(--color-text-tertiary)',
                            marginTop: '0.5rem',
                          }}
                        >
                          {related.readTime}
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        style={{
          paddingTop: '4rem',
          paddingBottom: '4rem',
          background: 'var(--color-black)',
          borderTop: '1px solid rgba(255,107,0,0.1)',
        }}
      >
        <div className="container">
          <div
            style={{
              padding: '2rem',
              borderRadius: '1rem',
              background: 'rgba(255,107,0,0.05)',
              border: '1px solid rgba(255,107,0,0.15)',
              textAlign: 'center',
            }}
          >
            <h3
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.5rem',
                fontWeight: 'var(--weight-bold)',
                color: 'var(--color-text-primary)',
                marginBottom: '1rem',
              }}
            >
              Ready to Transform Your Digital Presence?
            </h3>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.95rem',
                color: 'var(--color-text-secondary)',
                marginBottom: '1.5rem',
              }}
            >
              Let's discuss how ADVMEN can help you implement these strategies.
            </p>
            <Link
              to="/contact"
              className="inline-block"
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.95rem',
                fontWeight: 'var(--weight-semibold)',
                color: 'var(--color-white)',
                background: 'var(--color-orange)',
                padding: '0.75rem 1.5rem',
                borderRadius: '8px',
                textDecoration: 'none',
              }}
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </section>

      {/* Fullscreen Image Preview Lightbox Modal */}
      {isImageModalOpen && article.image && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 sm:p-8 animate-fadeIn"
          onClick={() => setIsImageModalOpen(false)}
        >
          <div 
            className="relative max-w-6xl max-h-[90vh] w-full flex flex-col items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setIsImageModalOpen(false)}
              className="absolute -top-12 right-0 sm:right-2 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all duration-200 z-10 flex items-center justify-center"
              title="Close (Esc)"
            >
              <FiX size={24} />
            </button>

            {/* Expanded Full Image */}
            <div className="w-full h-full flex items-center justify-center overflow-auto rounded-2xl border border-white/10 bg-black/50 shadow-2xl p-2">
              <img
                src={article.image}
                alt={article.title}
                className="max-w-full max-h-[85vh] w-auto h-auto object-contain rounded-xl shadow-2xl select-none"
              />
            </div>
            
            {/* Caption */}
            <div className="mt-3 text-center text-xs font-mono text-gray-400 max-w-xl truncate">
              {article.title}
            </div>
          </div>
        </div>
      )}
    </PageTransition>
  )
}

export default BlogPost
