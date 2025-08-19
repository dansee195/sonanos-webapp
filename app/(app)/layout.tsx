import '../globals.css';
import type { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';

export const metadata: Metadata = {
  title: 'App | Sonanos',
};

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen">
      <div className="dynamic-bg" />
      <div className="noise-overlay" />
      <Header />
      <Sidebar />
      <main className="md:pl-60">
        <div className="container py-8">{children}</div>
      </main>
    </div>
  );
}

