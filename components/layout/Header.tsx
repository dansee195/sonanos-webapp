import Link from 'next/link';

export function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-white/10 bg-bg/70 backdrop-blur-xl">
      <div className="container flex h-14 items-center justify-between">
        <Link href="/dashboard" className="text-white font-semibold">Sonanos</Link>
        <nav className="flex items-center gap-3">
          <Link href="/settings" className="text-text-dim hover:text-white">Einstellungen</Link>
          <Link href="/dashboard" className="text-text-dim hover:text-white">Support</Link>
        </nav>
      </div>
    </header>
  );
}

