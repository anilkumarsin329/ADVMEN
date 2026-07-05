/**
 * pages/Blog/index.jsx
 * ─────────────────────────────────────────────────────────────
 * ADVMEN Technologies — Blog Grid Page
 * Fully completed.
 * ─────────────────────────────────────────────────────────────
 */

import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { gsap } from '@utils/gsapConfig'

import SEOHead       from '@components/common/SEOHead'
import PageTransition from '@components/common/PageTransition'
import { blogArticles } from '@data/blog'

const Blog = () => {
  const headerRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.blog-stagger', {
        opacity: 0,
        y: 35,
        filter: 'blur(8px)',
        duration: 1.0,
        stagger: 0.12,
        ease: 'expo.out',
        delay: 0.15,
        clearProps: 'all',
      })
    }, headerRef)
    return () => ctx.revert()
  }, [])

  return (
    <PageTransition>
      <SEOHead
        title="Blog & Insights — ADVMEN Technologies"
        description="Read technical articles on React optimization, creative design engineering, and brand strategy."
      />

      <section
        ref={headerRef}
        className="relative w-full overflow-hidden"
        style={{
          paddingTop: 'calc(var(--navbar-height) + 4rem)',
          paddingBottom: '6rem',
          background: 'var(--color-black)',
        }}
        aria-label="Blog Articles"
      >
        <div className="container relative z-10">
          
          {/* Header */}
          <div className="max-w-3xl flex flex-col gap-6 mb-16">
            <div className="blog-stagger flex items-center gap-3">
              <span className="w-8 h-px bg-[var(--color-orange)]" />
              <span className="type-eyebrow" style={{ color: 'var(--color-orange)' }}>
                Agency Insights
              </span>
            </div>

            <h1
              className="blog-stagger section-title"
              style={{
                fontSize: 'clamp(2.5rem, 4.5vw, 4rem)',
                lineHeight: 1.15,
                fontWeight: 'var(--weight-bold)',
                letterSpacing: '-0.02em',
              }}
            >
              Thoughts on <span className="text-orange-gradient">Creative</span> Technology.
            </h1>

            <p
              className="blog-stagger type-body-lg"
              style={{
                color: 'var(--color-text-secondary)',
                lineHeight: 'var(--leading-relaxed)',
                maxWidth: '620px',
              }}
            >
              Read technical walkthroughs, optimization checklists, and design strategy analysis prepared by our team.
            </p>
          </div>

          {/* Articles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogArticles.map((article, i) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.8, delay: i * 0.1 }}
                whileHover={{ y: -6, borderColor: 'rgba(255,107,0,0.2)' }}
                className="group relative flex flex-col justify-between p-6 rounded-2xl cursor-default"
                style={{
                  background: 'rgba(255,255,255,0.01)',
                  border: '1px solid rgba(255,255,255,0.03)',
                  backdropFilter: 'blur(12px)',
                  transition: 'border-color 0.4s ease',
                  minHeight: '400px',
                }}
              >
                <div>
                  {/* Decorative Thumbnail Box */}
                  <div
                    className="relative w-full aspect-[16/10] rounded-xl overflow-hidden mb-6 flex items-center justify-center"
                    style={{
                      background: 'linear-gradient(135deg, #0f0f0f 0%, #150800 100%)',
                      border: '1px solid rgba(255,255,255,0.03)',
                    }}
                  >
                    <div
                      className="absolute inset-0 opacity-20 group-hover:scale-105 transition-transform duration-700"
                      style={{
                        background: 'radial-gradient(circle, var(--color-orange) 0%, transparent 60%)',
                        filter: 'blur(30px)',
                      }}
                    />
                    <span className="font-mono text-xs uppercase tracking-widest text-[rgba(255,255,255,0.12)]">
                      {article.category}
                    </span>
                  </div>

                  {/* Metadata line */}
                  <div className="flex items-center gap-3 font-mono text-[0.68rem] text-[var(--color-text-tertiary)] uppercase tracking-wider mb-3">
                    <span>{article.date}</span>
                    <span className="w-1 h-1 rounded-full bg-[rgba(255,255,255,0.15)]" />
                    <span>{article.readTime}</span>
                  </div>

                  {/* Title Link */}
                  <Link to={`/blog/${article.slug}`} className="block group/title">
                    <h3
                      className="group-hover/title:text-[var(--color-orange)] transition-colors duration-300 mb-3"
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: '1.25rem',
                        fontWeight: 'var(--weight-bold)',
                        color: 'var(--color-text-primary)',
                        lineHeight: '1.3',
                      }}
                    >
                      {article.title}
                    </h3>
                  </Link>

                  {/* Excerpt */}
                  <p
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.85rem',
                      color: 'var(--color-text-secondary)',
                      lineHeight: '1.65',
                    }}
                  >
                    {article.excerpt}
                  </p>
                </div>

                {/* Footer read link */}
                <div className="mt-8 pt-4 border-t border-[rgba(255,255,255,0.03)] flex justify-between items-center">
                  <span className="font-mono text-[0.68rem] uppercase tracking-wider text-[var(--color-text-tertiary)]">
                    By {article.author}
                  </span>
                  <Link
                    to={`/blog/${article.slug}`}
                    className="font-mono text-xs uppercase tracking-wider text-[var(--color-orange)] hover:underline flex items-center gap-1.5"
                    data-cursor="hover"
                  >
                    Read Post
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M2.5 6h7M6.5 2.5L10 6l-3.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </Link>
                </div>

              </motion.div>
            ))}
          </div>

        </div>
      </section>
    </PageTransition>
  )
}

export default Blog
