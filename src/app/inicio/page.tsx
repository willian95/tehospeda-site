import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'tehospeda', robots: { index: false } };

/** Dominio raíz o subdominio inválido: no corresponde a ningún hotel. */
export default function Inicio() {
  return (
    <main className="grid min-h-dvh place-items-center bg-sand px-4 text-center">
      <div className="max-w-md">
        <p className="font-display text-5xl text-night">tehospeda</p>
        <p className="mt-4 text-muted">Cada hotel tiene su propia web en su subdominio, por ejemplo santaana.tehospeda.com. Esta dirección no corresponde a ningún hotel.</p>
      </div>
    </main>
  );
}
