/** @type {import('next').NextConfig} **/
module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['welcoming-2022.s3.amazonaws.com'],
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    })
    return config
  },
};
