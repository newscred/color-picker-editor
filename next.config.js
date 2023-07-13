/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
        {
            source: '/_status',
            destination: '/api/_status'
        }     
    ];
  } 
};

module.exports = nextConfig;
