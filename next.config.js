/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'firebasestorage.googleapis.com',
      'github.com',
      'apiv3.apifootball.com',
    ],
  },
}

module.exports = nextConfig
