import { readFileSync } from 'node:fs';
import { describe, it, expect } from 'vitest';
const html = readFileSync('public/chida/index.html', 'utf8');
describe('Chida supplied business details', () => {
  it('uses the supplied phone number for every calling link', () => {
    const links = [...html.matchAll(/href="(tel:[^"]+)"/g)].map(match => match[1]);
    expect(links.length).toBeGreaterThanOrEqual(3);
    expect(links.every(link => link === 'tel:08100718883')).toBe(true);
  });
  it('includes the supplied aggregate rating and review count', () => {
    expect(html).toContain('<strong>4.5</strong>');
    expect(html).toContain('Based on 2,130 reviews');
  });
  it('keeps all three supplied reviews at four stars', () => {
    expect((html.match(/aria-label="4 out of 5 stars"/g) ?? []).length).toBe(3);
    expect(html).toContain('Omenogo The4th');
    expect(html).toContain('Abu Ugbede');
    expect(html).toContain('Afolayan Sunday');
  });
});
