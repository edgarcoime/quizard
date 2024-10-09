/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  rewrites: async () => {
    return [
      {
        source: "/api/py/:path*",
        destination: `http://${process.env.NODE_ENV === "development" ? "localhost:8000" : "nginx"}/api/py/:path*`
      }
    ]
  }
};

export default nextConfig;
