import type { Metadata, Viewport } from 'next';
import './globals.css';
import { bricolage, instrumentSerif, figtree, jetbrainsMono } from './fonts';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import ProgressBar from '@/components/ProgressBar';

export const metadata: Metadata = {
  metadataBase: new URL('https://pouse.app'),
  title: 'Pouse — your phone is the mouse',
  description:
    'Turn your Android phone into a wireless mouse for Windows 10/11. No extra hardware needed. Works over Wi-Fi or Bluetooth with Touchpad, Motion, Touchless, Gaming, and Remote Screen modes.',
  icons: {
    icon: '/assets/pouse-logo.png',
    apple: '/assets/pouse-logo.png',
  },
  openGraph: {
    title: 'Pouse — your phone is the mouse',
    description:
      'Turn your Android phone into a wireless mouse for Windows 10/11. No extra hardware needed. Works over Wi-Fi or Bluetooth.',
    url: 'https://pouse.app',
    siteName: 'Pouse',
    images: [
      {
        url: '/assets/pouse-logo.png',
        width: 512,
        height: 512,
        alt: 'Pouse Logo',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
};

export const viewport: Viewport = {
  themeColor: '#0b0716',
  viewportFit: 'cover',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${bricolage.variable} ${instrumentSerif.variable} ${figtree.variable} ${jetbrainsMono.variable}`}
    >
      <body>
        <ProgressBar />
        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
