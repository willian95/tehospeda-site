import path from 'node:path';
import type { NextConfig } from 'next';

const config: NextConfig = {
  output: 'standalone',
  // Monorepo: el servidor autónomo incluye también @erp/shared.
  outputFileTracingRoot: path.join(__dirname, '../../'),
  poweredByHeader: false,
  // En desarrollo cada hotel se abre en <slug>.localhost.
  allowedDevOrigins: ['*.localhost'],
  transpilePackages: ['@erp/shared'],
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
        ],
      },
    ];
  },
};

export default config;
