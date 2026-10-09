import { createFileRoute } from '@tanstack/react-router';
import { ChidaPreview, chidaHead } from '@/components/chida-preview';
export const Route = createFileRoute('/')({ head: chidaHead, component: ChidaPreview });
