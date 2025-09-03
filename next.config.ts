import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [{
      protocol: 'http',
      hostname: 'books.google.com',
      pathname: '/books/content/**',
    }, {
      protocol: 'https',
      hostname: 'd1csarkz8obe9u.cloudfront.net',
      port: '',
      pathname: '/**',
    },],
  },
};



export default nextConfig;
