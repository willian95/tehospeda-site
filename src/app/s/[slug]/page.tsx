import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Clock, Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
import { BookingBar } from '@/components/booking-bar';
import { BookingProvider } from '@/components/booking';
import { Header } from '@/components/header';
import { Amenity, Rooms } from '@/components/rooms';
import { mapsUrl } from '@/lib/format';
import { getSite, type Site } from '@/lib/site';

export const revalidate = 60;

const AMENITY_LABELS: Record<string, string> = {
  pool: 'Piscina',
  wifi: 'Wifi gratis',
  parking: 'Estacionamiento',
  ac: 'Aire acondicionado',
  breakfast: 'Desayuno',
  restaurant: 'Restaurante',
  bar: 'Bar',
  reception24: 'Recepción 24 horas',
  laundry: 'Lavandería',
  gym: 'Gimnasio',
  pets: 'Admite mascotas',
  transfer: 'Traslados',
};

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const site = await getSite((await params).slug);
  if (!site) return { title: 'Sitio no encontrado' };
  const title = `${site.hotel.name} · ${site.city ?? ''}`.replace(/ · $/, '');
  return {
    title,
    description: site.tagline ?? site.description ?? undefined,
    openGraph: { title, description: site.tagline ?? undefined, images: site.photos[0] ? [site.photos[0].url] : undefined, locale: 'es_VE', type: 'website' },
    robots: site.demo ? { index: false } : undefined,
  };
}

function jsonLd(site: Site) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Hotel',
    name: site.hotel.name,
    description: site.description ?? undefined,
    telephone: site.phone ?? undefined,
    email: site.email ?? undefined,
    checkinTime: site.hotel.checkInTime,
    checkoutTime: site.hotel.checkOutTime,
    address: { '@type': 'PostalAddress', streetAddress: site.address ?? undefined, addressLocality: site.city ?? undefined, addressRegion: site.region ?? undefined, addressCountry: site.country ?? undefined },
    amenityFeature: site.amenities.map((a) => ({ '@type': 'LocationFeatureSpecification', name: AMENITY_LABELS[a] ?? a, value: true })),
    image: site.photos.map((p) => p.url),
  };
}

export default async function HotelPage({ params }: Props) {
  const site = await getSite((await params).slug);
  if (!site) notFound();
  const [hero, second, third] = site.photos;
  const place = [site.city, site.region, site.country].filter(Boolean).join(', ');
  const whatsapp = site.whatsapp?.replace(/\D/g, '');

  return (
    <BookingProvider slug={site.slug} minDate={site.hotel.businessDate}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd(site)).replace(/</g, '\\u003c') }} />
      {site.demo && (
        <div className="fixed inset-x-0 top-0 z-50 flex h-9 items-center justify-center bg-night px-4 text-center text-[0.8125rem] text-white/90">
          <span className="sm:hidden">Demostración: datos y fotos de ejemplo</span>
          <span className="hidden sm:inline">Sitio de demostración: habitaciones, precios y fotos son de ejemplo.</span>
        </div>
      )}
      <Header name={site.hotel.name} demo={site.demo} />

      <main>
        {/* Portada: foto a sangre, nombre del hotel y barra de reserva superpuesta */}
        <section className="relative">
          <div className="relative h-[58svh] min-h-[420px] overflow-hidden bg-night md:h-[86svh] md:min-h-[560px]">
            {hero && <img src={hero.url} alt={hero.alt} className="absolute inset-0 size-full object-cover" fetchPriority="high" />}
            <div className="absolute inset-0 bg-gradient-to-b from-night/55 via-night/15 to-night/85" />
            <div className="container-page relative flex h-full flex-col justify-end pb-10 text-white md:pb-32">
              <h1 className="max-w-4xl font-display text-[clamp(2.75rem,8vw,6rem)] leading-[0.95] tracking-[-0.01em]">{site.hotel.name}</h1>
              {site.tagline && <p className="mt-4 max-w-xl text-lg text-white/90 sm:text-xl">{site.tagline}</p>}
              {place && <p className="mt-2 hidden items-center gap-2 text-white/80 sm:flex"><MapPin className="size-4" aria-hidden />{place}</p>}
            </div>
            {hero?.credit && (
              <div className="absolute inset-x-0 bottom-2 md:bottom-28">
                <p className="container-page text-right text-[0.75rem] text-white/85 [text-shadow:0_1px_3px_rgb(0_0_0/0.7)]">
                  {hero.alt} · Foto: {hero.credit}
                  {hero.license && `, ${hero.license}`}
                </p>
              </div>
            )}
          </div>
          <div className="container-page relative mt-3 md:-mt-20">
            <BookingBar />
          </div>
        </section>

        <section id="habitaciones" className="bg-sand py-20 sm:py-28">
          <div className="container-page">
            <div className="mb-10 max-w-2xl">
              <h2 className="font-display text-4xl text-night sm:text-5xl">Habitaciones</h2>
              <p className="mt-4 text-lg text-muted">Elige tus fechas para ver qué habitaciones quedan y el precio total de tu estancia.</p>
            </div>
            <Rooms rooms={site.rooms} currency={site.hotel.currency} taxRate={site.hotel.taxRate} />
          </div>
        </section>

        <section id="servicios" className="py-20 sm:py-28">
          <div className="container-page grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <h2 className="font-display text-4xl text-night sm:text-5xl">El hotel</h2>
              {site.description && <p className="mt-5 max-w-[60ch] text-lg text-ink/85">{site.description}</p>}
              {site.amenities.length > 0 && (
                <ul className="mt-8 grid gap-4 sm:grid-cols-2">
                  {site.amenities.map((a) => <Amenity key={a} label={AMENITY_LABELS[a] ?? a} />)}
                </ul>
              )}
              <dl className="mt-10 grid max-w-md grid-cols-2 gap-6 border-t border-line pt-6">
                <div>
                  <dt className="field-label flex items-center gap-1.5"><Clock className="size-3.5" aria-hidden />Entrada</dt>
                  <dd className="mt-1 text-2xl font-semibold text-night">desde {site.hotel.checkInTime}</dd>
                </div>
                <div>
                  <dt className="field-label flex items-center gap-1.5"><Clock className="size-3.5" aria-hidden />Salida</dt>
                  <dd className="mt-1 text-2xl font-semibold text-night">hasta {site.hotel.checkOutTime}</dd>
                </div>
              </dl>
            </div>
            {second && (
              <figure className="overflow-hidden rounded-lg shadow-[var(--shadow-card)]">
                <img src={second.url} alt={second.alt} loading="lazy" className="aspect-[4/3] w-full object-cover" />
              </figure>
            )}
          </div>
        </section>

        {site.nearby.length > 0 && (
          <section id="ubicacion" className="relative overflow-hidden bg-night py-20 text-white sm:py-28">
            {third && <img src={third.url} alt={third.alt} loading="lazy" className="absolute inset-0 size-full object-cover" />}
            <div className="absolute inset-0 bg-gradient-to-r from-night/95 via-night/75 to-night/10" />
            <div className="container-page relative grid gap-12 lg:grid-cols-[1fr_1fr]">
              <div>
                <h2 className="font-display text-4xl sm:text-5xl">{site.city ? `Alrededor de ${site.city}` : 'Alrededores'}</h2>
                {site.address && (
                  <p className="mt-5 flex items-start gap-2 text-lg text-white/85">
                    <MapPin className="mt-1.5 size-4 shrink-0" aria-hidden />
                    <span>{site.address}{place && `, ${place}`}</span>
                  </p>
                )}
                <a href={mapsUrl([site.hotel.name, site.address, place])} target="_blank" rel="noreferrer" className="btn mt-8 border border-white/70 text-white hover:bg-white hover:text-night">Ver en el mapa</a>
              </div>
              <ul className="divide-y divide-white/15 border-y border-white/15">
                {site.nearby.map((n) => (
                  <li key={n.name} className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 py-5">
                    <span className="text-lg font-medium">{n.name}</span>
                    <span className="text-white/75">{n.detail}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

        <section id="contacto" className="py-20 sm:py-28">
          <div className="container-page grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:items-start">
            <div>
              <h2 className="font-display text-4xl text-night sm:text-5xl">Contacto</h2>
              <p className="mt-4 max-w-md text-lg text-muted">¿Tienes dudas antes de reservar? Escríbenos o llámanos.</p>
            </div>
            <ul className="divide-y divide-line border-y border-line">
              {site.phone && <Contact href={`tel:${site.phone.replace(/\s/g, '')}`} icon={<Phone className="size-5" />} label="Teléfono" value={site.phone} />}
              {whatsapp && <Contact href={`https://wa.me/${whatsapp}`} icon={<MessageCircle className="size-5" />} label="WhatsApp" value={site.whatsapp!} />}
              {site.email && <Contact href={`mailto:${site.email}`} icon={<Mail className="size-5" />} label="Correo" value={site.email} />}
              {site.address && <Contact href={mapsUrl([site.hotel.name, site.address, place])} icon={<MapPin className="size-5" />} label="Dirección" value={`${site.address}${place ? `, ${place}` : ''}`} />}
            </ul>
          </div>
        </section>
      </main>

      <footer className="border-t border-line bg-sand py-10 text-sm text-muted">
        <div className="container-page flex flex-col gap-6 sm:flex-row sm:justify-between">
          <div>
            <p className="font-display text-xl text-night">{site.hotel.name}</p>
            {place && <p className="mt-1">{place}</p>}
          </div>
          <div className="max-w-xl sm:text-right">
            {site.photos.some((p) => p.credit) && (
              <p>
                Fotos:{' '}
                {site.photos
                  .filter((p) => p.credit)
                  .map((p, i, arr) => (
                    <span key={p.url}>
                      {p.sourceUrl ? <a href={p.sourceUrl} target="_blank" rel="noreferrer" className="underline underline-offset-2">{p.credit}</a> : p.credit}
                      {p.license && ` (${p.license})`}
                      {i < arr.length - 1 && ', '}
                    </span>
                  ))}
                .
              </p>
            )}
            <p className="mt-2">Reservas gestionadas con tehospeda.</p>
          </div>
        </div>
      </footer>
    </BookingProvider>
  );
}

function Contact({ href, icon, label, value }: { href: string; icon: React.ReactNode; label: string; value: string }) {
  const external = href.startsWith('http');
  return (
    <li>
      <a href={href} target={external ? '_blank' : undefined} rel={external ? 'noreferrer' : undefined} className="group flex items-center gap-4 py-5">
        <span className="text-bronze">{icon}</span>
        <span className="field-label w-24 shrink-0">{label}</span>
        <span className="font-medium break-words text-night underline-offset-4 group-hover:underline">{value}</span>
      </a>
    </li>
  );
}
