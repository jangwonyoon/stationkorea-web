import type { NextConfig } from "next";
import { deviceSizes, imageSizes } from "./src/lib/static-images.mjs";

// 완전 정적 HTML로 내보낸다(SEO·GEO: 본문이 클라이언트 렌더 없이 HTML에 있어야 한다).
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { loader: "custom", loaderFile: "./src/lib/image-loader.mjs", deviceSizes, imageSizes },
};

export default nextConfig;
