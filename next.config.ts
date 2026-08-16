import type { NextConfig } from "next";

/**
 * The site is a GitHub Pages *user* site (tnl293107.github.io), so it is served
 * from the domain root — no basePath or assetPrefix is needed.
 *
 * `output: "export"` emits a fully static `out/` directory, which rules out
 * server-only features (route handlers, ISR, middleware, runtime image
 * optimisation). `images.unoptimized` is required because the default loader
 * needs a server; next/image is still worth keeping for the intrinsic-size and
 * lazy-loading behaviour that stops layout shift.
 */
const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  // GitHub Pages serves /about as /about/index.html, so emit directories.
  trailingSlash: true,
  reactStrictMode: true,
};

export default nextConfig;
