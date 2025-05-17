/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'boltzmann.s3.amazonaws.com', // Your S3 bucket domain
      '127.0.0.1', // Added localhost domain
      // Add other domains you use for images here if needed
    ],
    
    // Alternative (Next.js 13+ recommended syntax):
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'boltzmann.s3.amazonaws.com',
        port: '',
        pathname: '/filer_public/**', // Adjust if your images are in different paths
      },
      {
        protocol: 'http',
        hostname: '127.0.0.1',
        port: '8000',
        pathname: '/static/images/**',
      },
    ],
  },
  
  // Other Next.js configuration options can go here
};

export default nextConfig;