import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="relative min-h-screen">
      <section className="relative z-10 container py-24">
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex rounded-full bg-white/5 px-3 py-1 ring-1 ring-white/10 backdrop-blur-sm animate-float">
            <span className="bg-brandGradient bg-clip-text text-transparent font-semibold">Modern Funnel Suite</span>
          </div>
          <h1 className="mt-6 text-5xl md:text-7xl font-semibold tracking-tight text-white">
            Baue Funnels schneller. Skaliere smarter.
          </h1>
          <p className="mt-6 text-lg text-text-dim">
            Sonanos vereint Funnels, CRM, E-Mail, Automationen und Analytics in einer schnellen, modernen Plattform.
          </p>
          <div className="mt-10 flex items-center justify-center gap-4">
            <Link href="/signin" className="group relative inline-flex items-center rounded-full px-6 py-3 text-base font-medium text-white">
              <span className="absolute inset-0 rounded-full bg-brandGradient blur-sm opacity-60 group-hover:opacity-80 transition" />
              <span className="relative z-10 rounded-full bg-brandGradient px-6 py-3">Kostenlos starten</span>
            </Link>
            <Link href="#features" className="relative inline-flex items-center rounded-full px-6 py-3 text-base font-medium text-text dotted-ring">
              Live Demo
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

