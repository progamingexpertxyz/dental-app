import { NextConfig } from 'next'
import withPWA, { type PWAConfig } from 'next-pwa'

const nextConfig: NextConfig & PWAConfig = {
  reactStrictMode: true,
  dest: 'public',
}

export default withPWA(nextConfig)
