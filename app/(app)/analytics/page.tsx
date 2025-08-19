import { getSeedKpis } from '@/lib/analytics';

export const dynamic = 'force-dynamic';

export default async function AnalyticsPage() {
  const kpis = await getSeedKpis('demo-org');
  return (
    <div>
      <h1 className="text-3xl font-semibold">Analytics</h1>
      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-4">
        {[
          { label: 'CR', value: `${Math.round(kpis.funnelCr * 100)}%` },
          { label: 'AOV', value: `€${kpis.aov}` },
          { label: 'LTV', value: `€${kpis.ltv}` },
          { label: 'Clicks', value: `${kpis.totalClicks}` },
        ].map((c) => (
          <div key={c.label} className="rounded-2xl bg-surface p-6 ring-1 ring-white/10">
            <div className="text-text-dim">{c.label}</div>
            <div className="mt-2 text-3xl font-semibold">{c.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

