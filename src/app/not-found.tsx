export default function NotFound() {
  return (
    <main className="grid min-h-dvh place-items-center bg-sand px-4 text-center">
      <div className="max-w-md">
        <h1 className="font-display text-5xl text-night">Sitio no encontrado</h1>
        <p className="mt-4 text-muted">No hay ningún hotel publicado en esta dirección. Revisa que esté bien escrita.</p>
      </div>
    </main>
  );
}
