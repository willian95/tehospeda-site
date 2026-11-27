import { NextResponse, type NextRequest } from 'next/server';

/**
 * Cada hotel vive en su subdominio: santaana.tehospeda.com → /s/santaana.
 * SITE_ROOT_DOMAINS admite varios dominios separados por comas (p. ej. "tehospeda.com,localhost").
 */
const ROOTS = (process.env.SITE_ROOT_DOMAINS ?? 'tehospeda.com,localhost').split(',').map((d) => d.trim().toLowerCase());
const SLUG = /^[a-z0-9](?:[a-z0-9-]{1,38}[a-z0-9])$/;

export function middleware(req: NextRequest) {
  const host = (req.headers.get('x-forwarded-host') ?? req.headers.get('host') ?? '').split(':')[0].toLowerCase();
  const root = ROOTS.find((r) => host === r || host.endsWith(`.${r}`));
  const sub = root && host !== root ? host.slice(0, -(root.length + 1)) : '';
  // La reescritura se construye sobre la URL real de la petición para que Next la resuelva internamente.
  if (!sub || sub === 'www' || !SLUG.test(sub)) {
    return NextResponse.rewrite(new URL('/inicio', req.url));
  }
  const path = req.nextUrl.pathname === '/' ? '' : req.nextUrl.pathname;
  return NextResponse.rewrite(new URL(`/s/${sub}${path}${req.nextUrl.search}`, req.url));
}

export const config = {
  // Ni la API, ni los recursos estáticos, ni las fotos pasan por aquí.
  matcher: ['/((?!api/|_next/|sites/|favicon|icon|robots.txt).*)'],
};
