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
