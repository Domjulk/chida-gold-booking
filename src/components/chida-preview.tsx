export function ChidaPreview() {
  return <iframe src="/chida/index.html" title="Chida Event Centre website" className="chida-preview" />;
}
export const chidaHead = () => ({ meta: [
  { title: 'Chida Event Centre | Weddings & Conferences in Abuja' },
  { name: 'description', content: 'Weddings, conferences and celebrations at Chida Event Centre, Abuja. Call 0810 071 8883.' },
  { property: 'og:title', content: 'Chida Event Centre | Abuja' },
  { property: 'og:description', content: 'Plan your next occasion at Chida Event Centre. Call 0810 071 8883.' },
  { property: 'og:type', content: 'website' },
  { name: 'twitter:card', content: 'summary_large_image' },
] });
