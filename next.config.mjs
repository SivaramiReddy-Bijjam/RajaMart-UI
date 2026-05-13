/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',

  images: {
    unoptimized: true,
    formats: ["image/avif", "image/webp"],
  },

  basePath: '/RajaMart-UI',
  assetPrefix: '/RajaMart-UI/',
};

export default nextConfig;
