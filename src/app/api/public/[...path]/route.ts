import type { NextRequest } from 'next/server';

/**
 * Proxy en tiempo de ejecución hacia la API pública del ERP: el navegador llama a /api/public/* en el
 * subdominio del hotel y aquí se reenvía a API_INTERNAL_URL (sin CORS y sin exponer la API).
 */
const API = () => process.env.API_INTERNAL_URL ?? 'http://localhost:3000';
const SEGMENT = /^[A-Za-z0-9_-]+$/;
const IP = /^[0-9a-fA-F:.]{2,45}$/;

async function forward(req: NextRequest, { params }: { params: Promise<{ path: string[] }> }) {
  const { path } = await params;
  // Solo segmentos simples (slug, "availability", "requests"): impide salir de /api/public con "..".
  if (!path.length || !path.every((s) => SEGMENT.test(s))) return Response.json({ message: 'Not found' }, { status: 404 });
  const target = `${API()}/api/public/${path.join('/')}${req.nextUrl.search}`;
  const candidate = req.headers.get('x-forwarded-for')?.split(',')[0].trim() ?? req.headers.get('x-real-ip') ?? '';
  const ip = IP.test(candidate) ? candidate : '';
  try {
    const res = await fetch(target, {
      method: req.method,
      headers: { 'content-type': 'application/json', ...(ip ? { 'x-forwarded-for': ip } : {}) },
      body: req.method === 'GET' ? undefined : await req.text(),
      cache: 'no-store',
    });
    return new Response(await res.text(), { status: res.status, headers: { 'content-type': res.headers.get('content-type') ?? 'application/json' } });
  } catch (err) {
    console.error('Error contacting the API', { path: path.join('/'), message: (err as Error).message });
    return Response.json({ message: 'Internal error' }, { status: 502 });
  }
}

export const GET = forward;
export const POST = forward;
