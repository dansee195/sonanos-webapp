import { prisma } from './db';

export async function recordEvent(orgId: string, type: string, payload: unknown) {
  await prisma.eventLog.create({ data: { orgId, type, payload: payload as any } });
}

export async function getSeedKpis(orgId: string) {
  const formSubmissions = await prisma.submission.count({ where: { orgId } });
  const links = await prisma.shortLink.findMany({ where: { orgId }, include: { clicks: true } });
  const totalClicks = links.reduce((s, l) => s + l.clicks.length, 0);
  return { formSubmissions, totalClicks, funnelCr: 0.27, aov: 87.5, ltv: 420 };
}

