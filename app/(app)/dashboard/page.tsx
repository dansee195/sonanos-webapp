import { getSeedKpis } from '@/lib/analytics';

export default async function DashboardPage() {
  const kpis = await getSeedKpis('demo-org');
  return (
    <div>
      <h1 className="text-3xl font-semibold">Dashboard</h1>
      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="rounded-2xl bg-surface p-6 ring-1 ring-white/10">
          <div className="text-text-dim">Form Submissions</div>
          <div className="mt-2 text-3xl font-semibold">{kpis.formSubmissions}</div>
        </div>
        <div className="rounded-2xl bg-surface p-6 ring-1 ring-white/10">
          <div className="text-text-dim">Total Clicks</div>
          <div className="mt-2 text-3xl font-semibold">{kpis.totalClicks}</div>
        </div>
        <div className="rounded-2xl bg-surface p-6 ring-1 ring-white/10">
          <div className="text-text-dim">Funnel CR</div>
          <div className="mt-2 text-3xl font-semibold">{Math.round(kpis.funnelCr * 100)}%</div>
        </div>
      </div>
    </div>
  );
}

