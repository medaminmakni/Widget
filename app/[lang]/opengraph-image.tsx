import { ImageResponse } from 'next/og';
import { getDictionary } from '@/lib/i18n';

export const alt = 'Widget Consulting';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

/** Social preview image (Facebook, LinkedIn, WhatsApp) generated at build time for each language. */
export default async function OpengraphImage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const t = getDictionary(lang);
  const tile = (x: number, y: number, color: string, rotate = 0) => (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        width: 120,
        height: 120,
        borderRadius: 28,
        background: color,
        transform: `rotate(${rotate}deg)`,
      }}
    />
  );
  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', background: '#F5F2EC', position: 'relative', padding: 80 }}>
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', width: 640, height: '100%' }}>
          <div style={{ display: 'flex', fontSize: 40, fontWeight: 700, color: '#12141C' }}>widget</div>
          <div style={{ display: 'flex', fontSize: 72, fontWeight: 700, lineHeight: 1.02, color: '#12141C', letterSpacing: -2 }}>
            {t.meta.ogTitle}
          </div>
          <div style={{ display: 'flex', fontSize: 26, color: '#565B66' }}>Sfax → worldwide · web · mobile · data</div>
        </div>
        {tile(760, 300, '#12141C')}
        {tile(900, 300, '#D9D3C7')}
        {tile(760, 440, '#12141C')}
        {tile(900, 440, '#12141C')}
        {tile(1000, 150, '#FF5B1F', 10)}
      </div>
    ),
    size,
  );
}
