import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function POST(req: Request) {
  const { formId, data } = await req.json();
  const sub = await prisma.submission.create({ data: { orgId: 'demo-org', formId, data } });
  return NextResponse.json({ ok: true, submissionId: sub.id });
}

