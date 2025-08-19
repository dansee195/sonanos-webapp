import { prisma } from '@/lib/db';

export default async function FormsPage() {
  const forms = await prisma.form.findMany({ where: { orgId: 'demo-org' }, include: { submissions: true } });
  return (
    <div>
      <h1 className="text-3xl font-semibold">Formulare</h1>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {forms.map((f) => (
          <div key={f.id} className="rounded-2xl bg-surface p-6 ring-1 ring-white/10">
            <div className="text-lg font-medium">{f.name}</div>
            <div className="text-text-dim">Submissions: {f.submissions.length}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

