/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Allow images from your own domain + any external sources you use
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    // Local images from /public folder work automatically - no config needed
    // But this ensures the Image component is fully enabled
    unoptimized: false,
  },
};

export default nextConfig;