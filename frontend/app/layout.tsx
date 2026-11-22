import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'WordPressDev — Headless WordPress',
  description: 'A headless WordPress starter with a custom Projects content type.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
