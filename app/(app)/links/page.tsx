import { prisma } from '@/lib/db';
import Link from 'next/link';

export default async function LinksPage() {
  const links = await prisma.shortLink.findMany({ where: { orgId: 'demo-org' }, include: { clicks: true } });
  return (
    <div>
      <h1 className="text-3xl font-semibold">Shortlinks</h1>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {links.map((l) => (
          <div key={l.id} className="rounded-2xl bg-surface p-6 ring-1 ring-white/10">
            <div className="text-lg font-medium">/{l.slug}</div>
            <div className="text-text-dim break-all">{l.target}</div>
            <div className="mt-2 text-text-dim">Klicks: {l.clicks.length}</div>
            <div className="mt-3">
              <Link href={`/links/${l.slug}`} className="text-primary">Link öffnen</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

