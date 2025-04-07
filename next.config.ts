const { withNetlify } = require('@netlify/next')

module.exports = withNetlify({
  reactStrictMode: true,
  // other next config if any
})
