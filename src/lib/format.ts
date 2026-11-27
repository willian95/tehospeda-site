export function money(value: string | number, currency: string, decimals = 0) {
  return new Intl.NumberFormat('es-VE', { style: 'currency', currency, minimumFractionDigits: decimals, maximumFractionDigits: decimals }).format(Number(value));
}

/** Total con impuestos, redondeado a céntimos como lo cobra el folio. */
export function withTax(amount: string | number, taxRate: string | number) {
  return Math.round(Number(amount) * (1 + Number(taxRate) / 100) * 100) / 100;
}

export function addDays(date: string, days: number) {
  const d = new Date(`${date}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + days);
  return d.toISOString().slice(0, 10);
}

export function shortDate(iso: string) {
  return new Intl.DateTimeFormat('es-VE', { weekday: 'short', day: 'numeric', month: 'short', timeZone: 'UTC' }).format(new Date(`${iso}T00:00:00Z`)).replace(/\./g, '');
}

export function mapsUrl(parts: (string | null | undefined)[]) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(parts.filter(Boolean).join(', '))}`;
}
