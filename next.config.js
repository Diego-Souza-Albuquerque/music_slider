/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        // Configuração para permitir solicitações de qualquer origem (CORS básico)
        source: "/api/:path*",
        headers: [
          {
            key: "Access-Control-Allow-Origin",
            value: "*",
          },
        ],
      },
    ];
  },
  env: {
    GOOGLE_API_KEY: process.env.GOOGLE_API_KEY,
    CX_CONFIG_ID: process.env.CX_CONFIG_ID,
    VAGALUME_API_KEY: process.env.VAGALUME_API_KEY,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    UPLOADTHING_SECRET: process.env.UPLOADTHING_SECRET,
    UPLOADTHING_APP_ID: process.env.UPLOADTHING_APP_ID,
    MONGODB_URI: process.env.MONGODB_URI,
  },
  images: {
    remotePatterns: [
      {
        hostname: "images.unsplash.com",
      },
      {
        hostname: "media.licdn.com",
      },
      {
        hostname: "lh3.googleusercontent.com",
      },
    ],
  },
};

module.exports = nextConfig;
