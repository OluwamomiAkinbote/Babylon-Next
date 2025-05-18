/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      // Existing S3 config
      {
        protocol: 'https',
        hostname: 'boltzmann.s3.amazonaws.com',
        port: '',
        pathname: '/filer_public/**',
      },
      // Local development
      {
        protocol: 'http',
        hostname: '127.0.0.1',
        port: '8000',
        pathname: '/static/images/**',
      },
      // Add these new patterns for your Django API
      {
        protocol: 'https',
        hostname: 'ayo.newstropy.online',
        port: '',
        pathname: '/media/**',  // For filer/media files
      },
      {
        protocol: 'https',
        hostname: 'ayo.newstropy.online',
        port: '',
        pathname: '/static/**',  // For static files
      },
      {
        protocol: 'https',
        hostname: 'ayo.newstropy.online',
        port: '',
        pathname: '/filer/**',  // For django-filer
      },
    ],
  },

  // Rewrites for API proxy
  async rewrites() {
    return [
      // Proxy all API requests
      {
        source: '/api/:path*',
        destination: 'https://ayo.newstropy.online/:path*',
      },
      // Special cases for specific apps
      {
        source: '/user_auth/:path*',
        destination: 'https://ayo.newstropy.online/user_auth/:path*',
      },
      {
        source: '/shop/:path*',
        destination: 'https://ayo.newstropy.online/shop/:path*',
      },
      {
        source: '/dashboard/:path*',
        destination: 'https://ayo.newstropy.online/dashboard/:path*',
      },
      // Static files
      {
        source: '/static/:path*',
        destination: 'https://ayo.newstropy.online/static/:path*',
      },
      {
        source: '/media/:path*',
        destination: 'https://ayo.newstropy.online/media/:path*',
      },
    ];
  },

  // Security headers
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "connect-src 'self' ayo.newstropy.online",
              "img-src 'self' data: ayo.newstropy.online boltzmann.s3.amazonaws.com",
              "media-src 'self' ayo.newstropy.online",
              `script-src 'self' 'unsafe-inline' ${process.env.NODE_ENV === 'development' ? "'unsafe-eval'" : ""}`,
              "style-src 'self' 'unsafe-inline'",
            ].join('; ')
          }
        ]
      }
    ]
  }
};

export default nextConfig;