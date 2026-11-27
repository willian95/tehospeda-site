import 'server-only';

const API = process.env.API_INTERNAL_URL ?? 'http://localhost:3000';

export interface SitePhoto {
  url: string;
  alt: string;
  credit?: string;
  license?: string;
  sourceUrl?: string;
}

export interface SiteRoom {
  id: string;
  code: string;
  name: string;
  capacity: number;
  baseRate: string;
  description: string | null;
  beds: string | null;
  photoUrl: string | null;
}

export interface Site {
  slug: string;
  demo: boolean;
  tagline: string | null;
  description: string | null;
  address: string | null;
  city: string | null;
  region: string | null;
  country: string | null;
  phone: string | null;
  whatsapp: string | null;
  email: string | null;
  latitude: string | null;
  longitude: string | null;
  amenities: string[];
  nearby: { name: string; detail: string }[];
  photos: SitePhoto[];
  hotel: { name: string; currency: string; taxRate: string; checkInTime: string; checkOutTime: string; timezone: string; businessDate: string };
  rooms: SiteRoom[];
}

/** Datos públicos del hotel. Se cachean 60 s: cambios en el ERP aparecen en la web en menos de un minuto. */
export async function getSite(slug: string): Promise<Site | null> {
  const res = await fetch(`${API}/api/public/sites/${encodeURIComponent(slug)}`, { next: { revalidate: 60 } });
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`API ${res.status}`);
  return res.json();
}
