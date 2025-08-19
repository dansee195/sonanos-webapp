import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET(_: Request, { params }: { params: { slug: string } }) {
  const { slug } = params;
  const link = await prisma.shortLink.findUnique({ where: { slug } });
  if (!link) return NextResponse.redirect(new URL('/', process.env.NEXTAUTH_URL ?? 'http://localhost:3000'));
  await prisma.clickEvent.create({ data: { orgId: link.orgId, shortLinkId: link.id, userAgent: 'web', ip: '' } });
  return NextResponse.redirect(link.target);
}

