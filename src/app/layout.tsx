import type { Metadata } from 'next';
import './globals.css';
import { SiteShell } from '@/components/site-shell';

export const metadata: Metadata = {
  metadataBase: new URL('https://felixybanez.dev'),
  title: {
    default: 'Felix Edrian Ybañez — Senior Cross-Platform Systems Engineer',
    template: '%s — Felix Edrian Ybañez',
  },
    description:
      'A systems-oriented engineering portfolio about Flutter products, hardware communication, architecture, state recovery, and quality engineering.',
  openGraph: {
    type: 'website',
    title: 'Felix Edrian Ybañez — Senior Cross-Platform Systems Engineer',
    description:
      'Flutter systems, hardware integration, and enterprise software architecture.',
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
