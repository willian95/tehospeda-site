import type { Metadata, Viewport } from 'next';
import '@fontsource/libre-caslon-display/400.css';
import '@fontsource/figtree/400.css';
import '@fontsource/figtree/500.css';
import '@fontsource/figtree/600.css';
import './globals.css';

export const metadata: Metadata = { title: 'tehospeda' };
export const viewport: Viewport = { themeColor: '#1e2a3a', width: 'device-width', initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
