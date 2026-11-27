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
    const security = [
      { key: 'X-Content-Type-Options', value: 'nosniff' },
      { key: 'X-Frame-Options', value: 'DENY' },
      { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
      { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), payment=(), usb=()' },
      { key: 'Cross-Origin-Opener-Policy', value: 'same-origin' },
    ];
    // La CSP solo en producción: el servidor de desarrollo necesita eval para la recarga en caliente.
    // Next.js inserta scripts en línea para hidratar la página, de ahí 'unsafe-inline' en script-src.
    if (process.env.NODE_ENV === 'production') {
      security.push({
        key: 'Content-Security-Policy',
        value: [
          "default-src 'self'",
          "script-src 'self' 'unsafe-inline'",
          "style-src 'self' 'unsafe-inline'",
          "img-src 'self' data: https:",
          "font-src 'self'",
          "connect-src 'self'",
          "frame-ancestors 'none'",
          "base-uri 'self'",
          "form-action 'self'",
          "object-src 'none'",
        ].join('; '),
      });
    }
    return [{ source: '/:path*', headers: security }];
  },
};

export default config;
