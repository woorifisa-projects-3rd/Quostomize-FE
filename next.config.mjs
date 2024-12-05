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
        domains: ["raw.githubusercontent.com"]
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

    images: {
        remotePatterns: [
            {
            protocol: 'https',
            hostname: 'raw.githubusercontent.com',
            pathname: '/Tarikul-Islam-Anik/Animated-Fluent-Emojis/**'
            }
        ]
    }, 
    
    reactStrictMode: false,
}
export default nextConfig;
