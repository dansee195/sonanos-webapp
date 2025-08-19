import { prisma } from '@/lib/db';

export const dynamic = 'force-dynamic';

export default async function ContactsPage() {
  const contacts = await prisma.contact.findMany({ where: { orgId: 'demo-org' }, take: 20, include: { company: true } });
  return (
    <div>
      <h1 className="text-3xl font-semibold">Contacts</h1>
      <div className="mt-6 rounded-2xl bg-surface ring-1 ring-white/10">
        <table className="w-full text-sm">
          <thead className="text-left text-text-dim">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">E-Mail</th>
              <th className="px-4 py-3">Company</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((c) => (
              <tr key={c.id} className="border-t border-white/10">
                <td className="px-4 py-3">{c.firstName} {c.lastName}</td>
                <td className="px-4 py-3">{c.email}</td>
                <td className="px-4 py-3">{c.company?.name ?? '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

