
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "sgp.cloud.appwrite.io",
        pathname: "/v1/storage/buckets/**"
      }
    ]
  }
};

export default nextConfig;
