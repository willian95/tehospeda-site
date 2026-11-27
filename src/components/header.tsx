'use client';

import { Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';

const links = [
  ['#habitaciones', 'Habitaciones'],
  ['#servicios', 'El hotel'],
  ['#ubicacion', 'Ubicación'],
  ['#contacto', 'Contacto'],
] as const;

/** Cabecera transparente sobre la foto; se vuelve blanca y fija al desplazarse. */
export function Header({ name, demo }: { name: string; demo: boolean }) {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  const light = solid || open;

  return (
    <header className={`fixed inset-x-0 z-40 transition-colors duration-200 ${demo ? 'top-9' : 'top-0'} ${light ? 'bg-white text-night shadow-[0_1px_0_var(--color-line)]' : 'bg-transparent text-white'}`}>
      <div className="container-page flex h-16 items-center justify-between gap-6 sm:h-20">
        <a href="#" className="font-display text-2xl leading-none sm:text-[1.75rem]">{name}</a>
        <nav aria-label="Secciones" className="hidden items-center gap-8 lg:flex">
          {links.map(([href, label]) => (
            <a key={href} href={href} className="text-[0.9375rem] font-medium underline-offset-8 hover:underline">{label}</a>
          ))}
          <a href="#reservar" className="btn btn-primary h-11">Reservar</a>
        </nav>
        <div className="flex items-center gap-2 lg:hidden">
          <a href="#reservar" className="btn btn-primary h-10 px-4 text-sm">Reservar</a>
          <button type="button" className="-mr-2 p-2" aria-label={open ? 'Cerrar menú' : 'Abrir menú'} aria-expanded={open} onClick={() => setOpen((o) => !o)}>
            {open ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>
      </div>
      {open && (
        <nav aria-label="Secciones" className="container-page flex flex-col gap-1 pb-5 lg:hidden">
          {links.map(([href, label]) => (
            <a key={href} href={href} onClick={() => setOpen(false)} className="border-b border-line py-3 text-lg">{label}</a>
          ))}
          <a href="#reservar" onClick={() => setOpen(false)} className="btn btn-primary mt-4">Reservar</a>
        </nav>
      )}
    </header>
  );
}
