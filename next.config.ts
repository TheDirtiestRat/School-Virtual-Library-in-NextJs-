import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  exports : {
  images: {
    remotePatterns: [new URL('http://books.google.com')],
  },
}
};



export default nextConfig;
