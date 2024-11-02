/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  rewrites: async () => {
    return [
      {
        source: "/api/py/:path*",
        destination: `http://${process.env.NODE_ENV === "development" ? 'localhost' : 'backend'}:8000/api/py/:path*`
      }
    ]
  }
};

export default nextConfig;
