// next.config.js
const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true
});

const nextConfig = {
  reactStrictMode: true,
  // other config options here (if any)
};

module.exports = withPWA(nextConfig);
