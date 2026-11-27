'use client';

import { CalendarDays, ChevronDown, Loader2, Search, Users } from 'lucide-react';
import { addDays, shortDate } from '@/lib/format';
import { useBooking } from './booking';

/**
 * Barra de reserva al estilo de las cadenas: celdas separadas por filetes que muestran el valor ya formateado.
 * Cada celda envuelve el control nativo (invisible) para conservar teclado, accesibilidad y el selector del móvil.
 */
export function BookingBar() {
  const { search, setSearch, run, status, error, minDate } = useBooking();
  const nights = Math.round((Date.parse(search.departure) - Date.parse(search.arrival)) / 86_400_000);
  return (
    <form
      id="reservar"
      onSubmit={(e) => {
        e.preventDefault();
        void run();
      }}
      className="overflow-hidden rounded-xl bg-white shadow-[var(--shadow-bar)]"
      aria-label="Buscar disponibilidad"
    >
      <div className="grid grid-cols-2 md:grid-cols-[1fr_1fr_1fr_auto]">
        <Cell label="Llegada" icon={<CalendarDays className="size-3.5" aria-hidden />} value={shortDate(search.arrival)} className="border-r border-b border-line md:border-b-0">
          <input type="date" required min={minDate} value={search.arrival} onChange={(e) => e.target.value && setSearch({ arrival: e.target.value })} aria-label="Fecha de llegada" className="absolute inset-0 size-full cursor-pointer opacity-0" />
        </Cell>
        <Cell label={`Salida · ${nights} ${nights === 1 ? 'noche' : 'noches'}`} icon={<CalendarDays className="size-3.5" aria-hidden />} value={shortDate(search.departure)} className="border-b border-line md:border-r md:border-b-0">
          <input type="date" required min={addDays(search.arrival, 1)} value={search.departure} onChange={(e) => e.target.value && setSearch({ departure: e.target.value })} aria-label="Fecha de salida" className="absolute inset-0 size-full cursor-pointer opacity-0" />
        </Cell>
        <div className="col-span-2 grid grid-cols-2 border-b border-line md:col-span-1 md:border-b-0">
          <Cell label="Adultos" icon={<Users className="size-3.5" aria-hidden />} value={String(search.adults)} chevron className="border-r border-line">
            <select value={search.adults} onChange={(e) => setSearch({ adults: Number(e.target.value) })} aria-label="Adultos" className="absolute inset-0 size-full cursor-pointer opacity-0">
              {[1, 2, 3, 4, 5, 6].map((n) => <option key={n} value={n}>{n}</option>)}
            </select>
          </Cell>
          <Cell label="Niños" value={String(search.children)} chevron>
            <select value={search.children} onChange={(e) => setSearch({ children: Number(e.target.value) })} aria-label="Niños" className="absolute inset-0 size-full cursor-pointer opacity-0">
              {[0, 1, 2, 3, 4].map((n) => <option key={n} value={n}>{n}</option>)}
            </select>
          </Cell>
        </div>
        <div className="col-span-2 p-3 md:col-span-1 md:p-3">
          <button type="submit" className="btn btn-primary h-full min-h-12 w-full md:min-w-52" disabled={status === 'loading'}>
            {status === 'loading' ? <Loader2 className="size-4 animate-spin" aria-hidden /> : <Search className="size-4" aria-hidden />}
            Ver disponibilidad
          </button>
        </div>
      </div>
      {error && <p role="alert" className="border-t border-line px-5 py-3 text-sm text-danger">{error}</p>}
    </form>
  );
}

function Cell({ label, icon, value, chevron, className, children }: { label: string; icon?: React.ReactNode; value: string; chevron?: boolean; className?: string; children: React.ReactNode }) {
  return (
    <div className={`relative px-5 py-3 transition-colors focus-within:z-10 focus-within:bg-sand focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-bronze hover:bg-sand ${className ?? ''}`}>
      <span className="field-label flex items-center gap-1.5">{icon}{label}</span>
      <span className="mt-1 flex items-center justify-between gap-2 text-lg font-semibold text-night">
        {value}
        {chevron && <ChevronDown className="size-4 text-muted" aria-hidden />}
      </span>
      {children}
    </div>
  );
}
