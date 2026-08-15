import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // GitHub Pages serves plain files: no Node server, no Image Optimisation API.
  output: 'export',
  images: { unoptimized: true },
  // A user site is served from the domain root, so no basePath is needed.
  trailingSlash: true,
};

export default nextConfig;
