import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET() {
  const links = await prisma.shortLink.findMany({ where: { orgId: 'demo-org' } });
  return NextResponse.json({ links });
}

export async function POST(req: Request) {
  const body = await req.json();
  const created = await prisma.shortLink.create({ data: { orgId: 'demo-org', slug: body.slug, target: body.target, utm: body.utm ?? {} } });
  return NextResponse.json(created);
}

