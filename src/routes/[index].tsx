import { createFileRoute } from '@tanstack/react-router';
import { ChidaPreview } from '@/components/chida-preview';
export const Route = createFileRoute('/index')({ head: () => ({ meta: [
  { title: 'Chida Event Centre | Abuja Venue Preview' },
  { name: 'description', content: 'Discover the Chida Event Centre website mockup, featuring Abuja celebrations and guest reviews.' },
  { property: 'og:title', content: 'Chida Event Centre | Venue Preview' },
  { property: 'og:description', content: 'An Abuja event centre for weddings, conferences and celebrations.' },
  { property: 'og:type', content: 'website' },
  { name: 'twitter:card', content: 'summary_large_image' },
] }), component: ChidaPreview });
