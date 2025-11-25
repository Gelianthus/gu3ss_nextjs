import { NextConfig } from "next";

const nextConfig: NextConfig = {
   images: {
    // domains: ["ehgifpafyaxzmfyhyuis.supabase.co"], 
     remotePatterns: [
      {
        protocol: "https",
        hostname: "ehgifpafyaxzmfyhyuis.supabase.co",
        port: "",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
  serverExternalPackages:["@prisma/client"],
  productionBrowserSourceMaps: false,
  devIndicators: false
};

export default nextConfig;
