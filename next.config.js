/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['randomuser.me', 'tailwindui.com'],
    formats: ['image/avif', 'image/webp'],
    dangerouslyAllowSVG: true,
  },
  api: {
    bodyParser: false,  // Desactiva el análisis automático del cuerpo de la solicitud
    multipart: true,    // Permite la manipulación de datos de formulario multipart
  },
}

module.exports = nextConfig;
