import { Bricolage_Grotesque, Instrument_Serif, Figtree, JetBrains_Mono } from 'next/font/google';

export const bricolage = Bricolage_Grotesque({
  subsets: ['latin'],
  weight: ['300', '500', '800'],
  variable: '--font-bricolage',
  display: 'swap',
});

export const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  style: ['normal', 'italic'],
  variable: '--font-instrument',
  display: 'swap',
});

export const figtree = Figtree({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-figtree',
  display: 'swap',
});

export const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-mono',
  display: 'swap',
});
