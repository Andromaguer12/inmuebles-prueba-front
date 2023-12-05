const nextConfig = {
  reactStrictMode: true,
  i18n: {
    locales: ['es', 'en'],
    defaultLocale: 'en'
  },
  env: {
    NEXT_PUBLIC_APP_LOCAL_BACKEND_API: process.env.NEXT_PUBLIC_APP_LOCAL_BACKEND_API,
    NEXT_PUBLIC_APP_PROD_BACKEND_API: process.env.NEXT_PUBLIC_APP_PROD_BACKEND_API,
    DECRYPT_KEY: process.env.DECRYPT_KEY,
    LOCAL_REQUEST_VALIDATOR: process.env.LOCAL_REQUEST_VALIDATOR
  },
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost:8080',
        port: '',
        pathname: 'public/assets/images/projects/**'
      },
      {
        protocol: 'https',
        hostname: 'server.ac-dot.dev',
        port: '',
        pathname: 'public/assets/images/projects/**'
      },
    ]
  }
};

module.exports = nextConfig;
