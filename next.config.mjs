/** @type {import('next').NextConfig} */
// En GitHub Actions se define BASE_PATH=/nombre-repo para Pages en subruta.
// En local, sin variable → raíz (http://localhost:3000).
const basePath = process.env.BASE_PATH?.trim() || ''

const nextConfig = {
  output: 'export',
  ...(basePath ? { basePath } : {}),
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
