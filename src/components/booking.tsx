'use client';

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react';
import { addDays } from '@/lib/format';

export interface Option {
  roomTypeId: string;
  code: string;
  name: string;
  capacity: number;
  fits: boolean;
  available: boolean;
  lastRooms: boolean;
  nights: number;
  total: string;
}

interface Search {
  arrival: string;
  departure: string;
  adults: number;
  children: number;
}

interface Booking {
  slug: string;
  minDate: string;
  search: Search;
  setSearch: (s: Partial<Search>) => void;
  /** Resultado de la última búsqueda (null si aún no se buscó). */
  results: { for: Search; options: Option[] } | null;
  status: 'idle' | 'loading' | 'error';
  error: string | null;
  run: () => Promise<void>;
}

const Ctx = createContext<Booking | null>(null);

export function BookingProvider({ slug, minDate, children }: { slug: string; minDate: string; children: ReactNode }) {
  const [search, setSearchState] = useState<Search>({ arrival: addDays(minDate, 7), departure: addDays(minDate, 9), adults: 2, children: 0 });
  const [results, setResults] = useState<Booking['results']>(null);
  const [status, setStatus] = useState<Booking['status']>('idle');
  const [error, setError] = useState<string | null>(null);

  const setSearch = useCallback((s: Partial<Search>) => {
    setSearchState((prev) => {
      const next = { ...prev, ...s };
      if (next.departure <= next.arrival) next.departure = addDays(next.arrival, 1);
      return next;
    });
  }, []);

  const run = useCallback(async () => {
    setStatus('loading');
    setError(null);
    try {
      const q = new URLSearchParams({ arrival: search.arrival, departure: search.departure, adults: String(search.adults), children: String(search.children) });
      const res = await fetch(`/api/public/sites/${slug}/availability?${q}`);
      const data = await res.json().catch(() => null);
      if (!res.ok) throw new Error(res.status === 429 ? 'Demasiadas búsquedas seguidas. Espera un minuto.' : (data?.message ?? 'No pudimos consultar la disponibilidad.'));
      setResults({ for: search, options: data });
      setStatus('idle');
      document.getElementById('habitaciones')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } catch (e) {
      setStatus('error');
      setError(e instanceof Error && e.message !== 'Failed to fetch' ? e.message : 'Sin conexión. Revisa tu internet e inténtalo de nuevo.');
    }
  }, [search, slug]);

  const value = useMemo(() => ({ slug, minDate, search, setSearch, results, status, error, run }), [slug, minDate, search, setSearch, results, status, error, run]);
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useBooking() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useBooking fuera de BookingProvider');
  return ctx;
}
