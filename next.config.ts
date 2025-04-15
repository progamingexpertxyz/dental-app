// next.config.js (or next.config.mjs if you're using ESM)

const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development' // Disable SW in dev mode
});

module.exports = withPWA({
  reactStrictMode: true
});
