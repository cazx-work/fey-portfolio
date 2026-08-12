import type { Metadata } from 'next';
import './globals.css';
import { SiteShell } from '@/components/site-shell';

export const metadata: Metadata = {
  metadataBase: new URL('https://felixybanez.dev'),
  title: {
    default: 'Felix Edrian Ybañez — Full-Stack & Systems Engineer',
    template: '%s — Felix Edrian Ybañez',
  },
  description:
    'Full-Stack & Systems Engineer building dependable software across web, mobile, backend, native integrations, and connected systems.',
  openGraph: {
    type: 'website',
    title: 'Felix Edrian Ybañez — Full-Stack & Systems Engineer',
    description:
      'Dependable software across web, mobile, backend, native integrations, and connected systems—with strongest public proof in cross-platform architecture and hardware boundaries.',
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
