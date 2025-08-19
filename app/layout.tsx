import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Sonanos Funnel Suite',
  description: 'All-in-One Funnels, CRM, Automationen, E-Mail und mehr',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" suppressHydrationWarning>
      <body className={inter.className}>
        <div className="dynamic-bg" />
        <div className="noise-overlay" />
        {children}
      </body>
    </html>
  );
}

