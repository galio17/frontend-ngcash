/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    BASE_URL: "https://ngcash-giuseppe-test.herokuapp.com",
  },
};

module.exports = nextConfig;
