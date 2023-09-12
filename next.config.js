/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['randomuser.me', 'tailwindui.com'],
    formats: ['image/avif', 'image/webp'],
    dangerouslyAllowSVG: true,  // Añade esta línea
  },
}

module.exports = nextConfig;
