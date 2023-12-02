// next.config.js
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['randomuser.me', 'tailwindui.com'],
    formats: ['image/avif', 'image/webp'],
    dangerouslyAllowSVG: true,
  },
  compiler: {
    styledComponents: true, // Habilita el soporte para styled-components
  },
}

module.exports = nextConfig;
