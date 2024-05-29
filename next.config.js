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
    APP_API_URL: process.env.APP_API_URL,
    GOOGLE_API_KEY: process.env.GOOGLE_API_KEY,
    CX_CONFIG_ID: process.env.CX_CONFIG_ID,
    VAGALUME_API_KEY: process.env.VAGALUME_API_KEY,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    UPLOADTHING_SECRET: process.env.UPLOADTHING_SECRET,
    UPLOADTHING_APP_ID: process.env.UPLOADTHING_APP_ID,
    MONGODB_URI: process.env.MONGODB_URI,
    AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
    AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
    AWS_DEFAULT_REGION: process.env.AWS_DEFAULT_REGION,
    AWS_BUCKET_NAME: process.env.AWS_BUCKET_NAME,
    JWT_SECRET: process.env.JWT_SECRET,
    APP_API_URL: process.env.APP_API_URL,
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
