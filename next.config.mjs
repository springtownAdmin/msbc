/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        BACKEND_API: "http://13.127.133.23:8000/",
        AI_SUMMARY_API: "http://13.127.133.23:5000/",
    },
};

export default nextConfig;
