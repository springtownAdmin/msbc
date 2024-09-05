/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        // BACKEND_API: "http://13.127.133.23:8000/api/",
        BACKEND_API: "https://api.testsite.name/api/",
        // AI_SUMMARY_API: "http://13.127.133.23:5000/",
        AI_SUMMARY_API: "https://api.testsite.name/service/",
    },
};

export default nextConfig;
