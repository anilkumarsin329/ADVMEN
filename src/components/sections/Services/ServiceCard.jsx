// ServiceCard.jsx — Premium Service Card component

const ServiceCard = ({ service }) => {
  const IconComponent = service.icon
  const isReactIcon = typeof IconComponent === 'function'

  return (
    <div
      className="group relative flex flex-col justify-between p-6 sm:p-8 h-auto sm:h-80 rounded-2xl overflow-hidden transition-all duration-500 hover:shadow-lg"
      style={{
        background: 'rgba(255,255,255,0.01)',
        border: '1px solid rgba(255,107,0,0.15)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        cursor: 'default',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = 'rgba(255,255,255,0.03)'
        e.currentTarget.style.borderColor = 'rgba(255,107,0,0.3)'
        e.currentTarget.style.boxShadow = '0 12px 48px rgba(0,0,0,0.3), 0 0 24px rgba(255,107,0,0.12)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = 'rgba(255,255,255,0.01)'
        e.currentTarget.style.borderColor = 'rgba(255,107,0,0.15)'
        e.currentTarget.style.boxShadow = 'none'
      }}
    >
      {/* Glow effect */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 10% 10%, rgba(255,107,0,0.08) 0%, transparent 60%)',
        }}
      />

      {/* Top - Icon */}
      <div className="flex justify-between items-start relative z-10 mb-6">
        <div
          className="p-3 sm:p-3.5 rounded-xl transition-all duration-300 group-hover:scale-110 group-hover:bg-[rgba(255,107,0,0.12)]"
          style={{
            background: 'rgba(255,107,0,0.08)',
            border: '1px solid rgba(255,107,0,0.15)',
          }}
        >
          {isReactIcon ? <IconComponent size={24} color="var(--color-orange)" /> : <span>{service.icon}</span>}
        </div>
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.7rem',
            color: 'var(--color-text-tertiary)',
            letterSpacing: '0.1em',
          }}
        >
          {String(service.id).padStart(2, '0')}
        </span>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col gap-3 flex-1">
        <h3
          className="group-hover:text-[var(--color-orange)] transition-colors duration-300"
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.1rem, 2vw, 1.35rem)',
            fontWeight: 'var(--weight-bold)',
            color: 'var(--color-text-primary)',
            lineHeight: 1.2,
          }}
        >
          {service.title}
        </h3>
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'clamp(0.8rem, 1vw, 0.9rem)',
            color: 'var(--color-text-secondary)',
            lineHeight: '1.6',
          }}
        >
          {service.description}
        </p>
      </div>

      {/* Features */}
      <div className="relative z-10 mt-6 pt-6 border-t border-[rgba(255,255,255,0.05)]">
        <div className="flex flex-wrap gap-2">
          {service.features.map((feature, i) => (
            <span
              key={i}
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.65rem',
                color: 'var(--color-text-tertiary)',
                background: 'rgba(255,107,0,0.05)',
                border: '1px solid rgba(255,107,0,0.1)',
                padding: '0.35rem 0.75rem',
                borderRadius: '6px',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
              }}
            >
              {feature}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ServiceCard
