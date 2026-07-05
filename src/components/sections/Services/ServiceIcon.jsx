/**
 * ServiceIcon.jsx — Handcrafted premium vector icons
 */

const ServiceIcon = ({ name, className = '', size = 28 }) => {
  const props = {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: '1.5',
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    className: `text-[var(--color-orange)] ${className}`,
    'aria-hidden': 'true',
  }

  switch (name) {
    case 'brand':
    case 'branding':
      return (
        <svg {...props}>
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
        </svg>
      )
    case 'marketing':
    case 'digital-marketing':
      return (
        <svg {...props}>
          <path d="M3 18v-6a9 9 0 0 1 18 0v6M21 19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-1h18v1z" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      )
    case 'web':
    case 'web-development':
      return (
        <svg {...props}>
          <path d="M16 18l6-6-6-6M8 6L2 12l6 6M14 4l-4 16" />
        </svg>
      )
    case 'app':
    case 'app-development':
      return (
        <svg {...props}>
          <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
          <path d="M12 18h.01" />
        </svg>
      )
    case 'political':
    case 'political-campaigns':
      return (
        <svg {...props}>
          <path d="M12 2L2 22h20L12 2z" />
          <path d="M12 6v10M9 13h6" />
        </svg>
      )
    case 'media':
    case 'media-production':
      return (
        <svg {...props}>
          <path d="M23 7l-7 5 7 5V7z" />
          <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
        </svg>
      )
    case 'content':
    case 'content-creation':
      return (
        <svg {...props}>
          <path d="M12 20h9M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
        </svg>
      )
    case 'seo':
      return (
        <svg {...props}>
          <circle cx="11" cy="11" r="8" />
          <path d="M21 21l-4.35-4.35M11 8v6M8 11h6" />
        </svg>
      )
    case 'advertising':
      return (
        <svg {...props}>
          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0" />
        </svg>
      )
    default:
      // Fallback star / compass
      return (
        <svg {...props}>
          <circle cx="12" cy="12" r="10" />
          <path d="M12 2v20M2 12h20" />
        </svg>
      )
  }
}

export default ServiceIcon
