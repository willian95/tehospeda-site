'use client';

import { CheckCircle2, Loader2, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import type { SiteRoom } from '@/lib/site';
import { money, shortDate, withTax } from '@/lib/format';
import { useBooking, type Option } from './booking';

type Errors = Partial<Record<'firstName' | 'lastName' | 'email' | 'phone' | 'eta' | 'form', string>>;

/** Formulario de solicitud con las fechas ya puestas. El hotel la confirma desde su ERP. */
export function RequestDialog({ room, option, currency, taxRate, onClose }: { room: SiteRoom; option: Option; currency: string; taxRate: string; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null);
  const { slug, results } = useBooking();
  const search = results!.for;
  const [sending, setSending] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState<{ email: string } | null>(null);

  useEffect(() => {
    const d = ref.current;
    if (d && !d.open) d.showModal();
  }, []);

  async function submit(form: HTMLFormElement) {
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>;
    const next: Errors = {};
    if (!data.firstName?.trim()) next.firstName = 'Escribe tu nombre.';
    if (!data.lastName?.trim()) next.lastName = 'Escribe tus apellidos.';
    if (!/^\S+@\S+\.\S+$/.test(data.email ?? '')) next.email = 'Escribe un correo válido: ahí te confirmará el hotel.';
    setErrors(next);
    if (Object.keys(next).length) return;

    setSending(true);
    try {
      const res = await fetch(`/api/public/sites/${slug}/requests`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          roomTypeId: room.id,
          arrival: search.arrival,
          departure: search.departure,
          adults: search.adults,
          children: search.children,
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          phone: data.phone || null,
          eta: data.eta || null,
          notes: data.notes || null,
          website: data.website,
        }),
      });
      const body = await res.json().catch(() => null);
      if (!res.ok) {
        if (res.status === 422 && body?.errors) {
          setErrors(Object.fromEntries(Object.entries(body.errors as Record<string, string[]>).map(([k, v]) => [k, v[0]])));
        } else {
          setErrors({ form: res.status >= 500 ? 'No pudimos enviar la solicitud. Inténtalo de nuevo en unos minutos.' : (body?.message ?? 'No pudimos enviar la solicitud.') });
        }
        return;
      }
      setSent({ email: data.email });
    } catch {
      setErrors({ form: 'Sin conexión. Revisa tu internet e inténtalo de nuevo.' });
    } finally {
      setSending(false);
    }
  }

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      aria-labelledby="request-title"
      className="m-auto max-h-[calc(100dvh-2rem)] w-[min(36rem,calc(100vw-2rem))] rounded-xl bg-white p-0 text-ink shadow-[var(--shadow-bar)] backdrop:bg-night/60"
    >
      <div className="flex items-start justify-between gap-4 border-b border-line px-6 py-5">
        <div>
          <h2 id="request-title" className="text-xl font-semibold text-night">{sent ? 'Solicitud enviada' : room.name}</h2>
          <p className="mt-1 text-sm text-muted">
            {shortDate(search.arrival)} – {shortDate(search.departure)} · {option.nights} {option.nights === 1 ? 'noche' : 'noches'} · {search.adults + search.children} {search.adults + search.children === 1 ? 'huésped' : 'huéspedes'}
          </p>
        </div>
        <button type="button" onClick={onClose} className="-mr-2 rounded-md p-2 text-muted hover:text-night" aria-label="Cerrar">
          <X className="size-5" />
        </button>
      </div>

      {sent ? (
        <div className="px-6 py-8">
          <CheckCircle2 className="size-10 text-ok" aria-hidden />
          <p className="mt-4 text-lg text-night">El hotel recibió tu solicitud y te confirmará la reserva en {sent.email}.</p>
          <p className="mt-2 text-muted">Todavía no se ha cobrado nada. La habitación queda confirmada cuando el hotel te responda.</p>
          <button type="button" className="btn btn-outline mt-6" onClick={onClose}>Volver a la web</button>
        </div>
      ) : (
        <form
          noValidate
          onSubmit={(e) => {
            e.preventDefault();
            void submit(e.currentTarget);
          }}
          className="grid gap-4 px-6 py-6 sm:grid-cols-2"
        >
          <Input name="firstName" label="Nombre" autoComplete="given-name" error={errors.firstName} autoFocus />
          <Input name="lastName" label="Apellidos" autoComplete="family-name" error={errors.lastName} />
          <Input name="email" label="Correo" type="email" autoComplete="email" error={errors.email} className="sm:col-span-2" />
          <Input name="phone" label="Teléfono (opcional)" type="tel" autoComplete="tel" error={errors.phone} />
          <Input name="eta" label="Hora estimada de llegada (opcional)" type="time" error={errors.eta} />
          <label className="block sm:col-span-2">
            <span className="field-label">Comentarios (opcional)</span>
            <textarea name="notes" rows={3} maxLength={1000} className="field-input mt-1.5 h-auto py-2" />
          </label>
          {/* Campo trampa para bots: oculto a personas y a lectores de pantalla. */}
          <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden className="absolute -left-[9999px] size-px opacity-0" />
          <div className="flex items-baseline justify-between gap-4 border-t border-line pt-4 sm:col-span-2">
            <span className="text-muted">
              Total con impuestos
              <span className="block text-xs whitespace-nowrap">{money(option.total, currency, 2)} + IVA {Number(taxRate)}&nbsp;%</span>
            </span>
            <span className="text-2xl font-semibold text-night">{money(withTax(option.total, taxRate), currency, 2)}</span>
          </div>
          {errors.form && <p role="alert" className="text-sm text-danger sm:col-span-2">{errors.form}</p>}
          <button type="submit" className="btn btn-primary sm:col-span-2" disabled={sending}>
            {sending && <Loader2 className="size-4 animate-spin" aria-hidden />}
            Enviar solicitud
          </button>
          <p className="text-center text-xs text-muted sm:col-span-2">No se cobra nada ahora. El hotel confirma la reserva por correo.</p>
        </form>
      )}
    </dialog>
  );
}

function Input({ name, label, error, className, ...props }: { name: string; label: string; error?: string; className?: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  const id = `f-${name}`;
  return (
    <label htmlFor={id} className={`block ${className ?? ''}`}>
      <span className="field-label">{label}</span>
      <input id={id} name={name} aria-invalid={error ? true : undefined} aria-describedby={error ? `${id}-e` : undefined} className="field-input mt-1.5" {...props} />
      {error && <span id={`${id}-e`} className="mt-1 block text-sm text-danger">{error}</span>}
    </label>
  );
}
