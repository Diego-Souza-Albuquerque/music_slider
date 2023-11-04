/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    GOOGLE_API_KEY: process.env.GOOGLE_API_KEY,
    CX_CONFIG_ID: process.env.CX_CONFIG_ID,
    VAGALUME_API_KEY: process.env.VAGALUME_API_KEY,
  },
  images: {
    remotePatterns: [
      {
        hostname: "images.unsplash.com",
      },
      {
        hostname: "media.licdn.com",
      },
    ],
  },
};

module.exports = nextConfig;
