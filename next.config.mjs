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

    reactStrictMode: false,
}
export default nextConfig;
