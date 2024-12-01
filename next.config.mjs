/** @type {import('next').NextConfig} */
const nextConfig = {

    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "quostomize-bucket.s3.ap-northeast-2.amazonaws.com",
                port: "",
                pathname: "/image/*",
            },
        ],
    },

    webpack: config => {
        config.module.rules.push({
          test: /\.svg$/,
          use: ["@svgr/webpack"],
        });
    
        return config;
      },

    experimental: {
        turbo: {
            rules: {
            '*.svg': {
                loaders: ['@svgr/webpack'],
                as: '*.js',
                },
            },
        },
    },

    reactStrictMode: false,
}
export default nextConfig;
