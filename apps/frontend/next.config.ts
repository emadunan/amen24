import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  webpack(config) {
    config.resolve.alias["react-toastify"] = path.resolve(
      __dirname,
      "node_modules/react-toastify",
    );
    return config;
  },
};

export default nextConfig;
