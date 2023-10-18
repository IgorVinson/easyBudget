module.exports = {
  typescript: {
    ignoreBuildErrors: true,
  },

  env: {
    NEXT_PUBLIC_DATABASE_URL: process.env.NEXT_PUBLIC_DATABASE_URL,
    NEXT_PUBLIC_SECRET: process.env.NEXT_PUBLIC_SECRET,
  },
};
