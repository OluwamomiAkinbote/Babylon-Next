/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'boltzmann.s3.amazonaws.com',
        port: '',
        pathname: '/filer_public/**', // Adjust based on actual S3 path
      },
      {
        protocol: 'http',
        hostname: '127.0.0.1',
        port: '8000',
        pathname: '/static/images/**',
      },
    ],
  },

  // Other Next.js config options can go here
};

export default nextConfig;
