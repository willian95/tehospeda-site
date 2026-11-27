'use client';

import { BedDouble, Check, Users } from 'lucide-react';
import { useState } from 'react';
import type { SiteRoom } from '@/lib/site';
import { money, shortDate, withTax } from '@/lib/format';
import { useBooking, type Option } from './booking';
import { RequestDialog } from './request-dialog';

/**
 * Fichas de habitación con la misma rejilla: nombre, camas, capacidad, descripción y precio.
 * Tras buscar fechas, cada ficha muestra si queda sitio y el total de la estancia.
 */
export function Rooms({ rooms, currency, taxRate }: { rooms: SiteRoom[]; currency: string; taxRate: string }) {
  const { results, status } = useBooking();
  const [selected, setSelected] = useState<{ room: SiteRoom; option: Option } | null>(null);
  const byId = new Map(results?.options.map((o) => [o.roomTypeId, o]));
  const anyAvailable = results?.options.some((o) => o.available && o.fits);

  return (
    <>
      {results && (
        <p className="mb-8 text-muted" aria-live="polite">
          {shortDate(results.for.arrival)} – {shortDate(results.for.departure)} · {results.for.adults + results.for.children} {results.for.adults + results.for.children === 1 ? 'huésped' : 'huéspedes'}
          {!anyAvailable && ' · No quedan habitaciones para estas fechas. Prueba con otras.'}
        </p>
      )}
      <ul className={`grid gap-6 md:grid-cols-2 lg:grid-cols-3 ${status === 'loading' ? 'opacity-60' : ''}`}>
        {rooms.map((room) => {
          const option = byId.get(room.id);
          const bookable = option && option.available && option.fits;
          return (
            <li key={room.id} className="flex flex-col overflow-hidden rounded-lg bg-white shadow-[var(--shadow-card)]">
              {room.photoUrl && (
                <div className="aspect-[4/3] bg-sand-2">
                  <img src={room.photoUrl} alt={room.name} loading="lazy" className="size-full object-cover" />
                </div>
              )}
              <div className="flex flex-1 flex-col p-6">
                {option?.lastRooms && option.fits && <span className="mb-3 w-fit rounded-full bg-sand-2 px-3 py-1 text-xs font-semibold text-bronze-dark">Últimas habitaciones</span>}
                <h3 className="text-xl font-semibold text-night">{room.name}</h3>
                <p className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted">
                  {room.beds && <span className="flex items-center gap-1.5"><BedDouble className="size-4" aria-hidden />{room.beds}</span>}
                  <span className="flex items-center gap-1.5"><Users className="size-4" aria-hidden />Hasta {room.capacity} {room.capacity === 1 ? 'persona' : 'personas'}</span>
                </p>
                {room.description && <p className="mt-3 text-[0.9375rem] text-ink/85">{room.description}</p>}
                <div className="mt-auto flex flex-wrap items-end justify-between gap-4 border-t border-line pt-5">
                  {option ? (
                    option.fits ? (
                      option.available ? (
                        <div>
                          <p className="text-2xl font-semibold text-night">{money(withTax(option.total, taxRate), currency, 2)}</p>
                          <p className="text-sm text-muted">{option.nights} {option.nights === 1 ? 'noche' : 'noches'} · impuestos incluidos</p>
                          <p className="text-sm whitespace-nowrap text-muted">{money(option.total, currency, 2)} + IVA {Number(taxRate)}&nbsp;%</p>
                        </div>
                      ) : (
                        <p className="text-sm font-medium text-danger">Sin disponibilidad en esas fechas</p>
                      )
                    ) : (
                      <p className="text-sm font-medium text-muted">No admite {results!.for.adults + results!.for.children} huéspedes</p>
                    )
                  ) : (
                    <div>
                      <p className="text-sm text-muted">Desde, por noche</p>
                      <p className="text-2xl font-semibold whitespace-nowrap text-night">{money(room.baseRate, currency)} <span className="text-base font-normal text-muted">+ IVA {Number(taxRate)}&nbsp;%</span></p>
                    </div>
                  )}
                  {bookable ? (
                    <button type="button" className="btn btn-primary whitespace-nowrap" onClick={() => setSelected({ room, option })}>Solicitar</button>
                  ) : !option ? (
                    <a href="#reservar" className="btn btn-outline whitespace-nowrap">Elegir fechas</a>
                  ) : null}
                </div>
              </div>
            </li>
          );
        })}
      </ul>
      {selected && <RequestDialog room={selected.room} option={selected.option} currency={currency} taxRate={taxRate} onClose={() => setSelected(null)} />}
    </>
  );
}

export function Amenity({ label }: { label: string }) {
  return (
    <li className="flex items-center gap-3 text-ink">
      <span className="grid size-9 shrink-0 place-items-center rounded-full bg-sand-2 text-bronze"><Check className="size-4" aria-hidden /></span>
      {label}
    </li>
  );
}
