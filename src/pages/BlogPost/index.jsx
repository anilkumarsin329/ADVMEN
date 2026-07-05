/**
 * pages/BlogPost/index.jsx
 * Blog Post Detail Page
 */

import { useParams, useNavigate, Link } from 'react-router-dom'
import { useEffect } from 'react'
import SEOHead from '@components/common/SEOHead'
import PageTransition from '@components/common/PageTransition'
import { getBlogBySlug, blogArticles } from '@data/blog'
import { FiArrowLeft, FiShare2, FiCopy } from 'react-icons/fi'

const BlogPost = () => {
  const { slug } = useParams()
  const navigate = useNavigate()
  const article = getBlogBySlug(slug)

  useEffect(() => {
    if (!article) {
      navigate('/404')
    }
  }, [article, navigate])

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
          paddingBottom: '4rem',
          background: 'var(--color-black)',
        }}
      >
        <div className="container">
          <div
            style={{
              width: '100%',
              aspectRatio: '16 / 9',
              borderRadius: '1.5rem',
              overflow: 'hidden',
              background: 'linear-gradient(135deg, rgba(255,107,0,0.1) 0%, rgba(255,107,0,0.05) 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px solid rgba(255,107,0,0.15)',
            }}
          >
            <div style={{ fontSize: '4rem', opacity: 0.2 }}>📝</div>
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
    </PageTransition>
  )
}

export default BlogPost
