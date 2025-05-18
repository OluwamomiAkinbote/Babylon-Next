/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'boltzmann.s3.amazonaws.com',
        pathname: '/filer_public/**',
      },
      {
        protocol: 'http',
        hostname: '127.0.0.1',
        port: '8000',
        pathname: '/static/images/**',
      },
      {
        protocol: 'https',
        hostname: 'ayo.newstropy.online',
        pathname: '/static/images/**',
      },
      {
        protocol: 'https',
        hostname: 'ayo.newstropy.online',
        pathname: '/media/**',
      },
    ],
  },
};

export default nextConfig;
