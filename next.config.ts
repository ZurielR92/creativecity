import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'firebasestorage.googleapis.com',
        pathname: '/**', // Opcional, para permitir todas las rutas del dominio
      },
    ],
  },
};

export default nextConfig;
