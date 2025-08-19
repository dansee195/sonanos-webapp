import { PrismaClient, Role } from '@prisma/client';
import { addDays } from 'date-fns';

const prisma = new PrismaClient();

async function main() {
  const org = await prisma.organization.upsert({
    where: { id: 'demo-org' },
    update: {},
    create: { id: 'demo-org', name: 'Sonanos Demo' },
  });

  const userOwner = await prisma.user.upsert({
    where: { email: 'owner@demo.local' },
    update: {},
    create: { email: 'owner@demo.local', name: 'Owner' },
  });
  const userAdmin = await prisma.user.upsert({
    where: { email: 'admin@demo.local' },
    update: {},
    create: { email: 'admin@demo.local', name: 'Admin' },
  });
  const userMember = await prisma.user.upsert({
    where: { email: 'member@demo.local' },
    update: {},
    create: { email: 'member@demo.local', name: 'Member' },
  });

  const members = [
    { userId: userOwner.id, role: 'owner' as Role },
    { userId: userAdmin.id, role: 'admin' as Role },
    { userId: userMember.id, role: 'member' as Role },
  ];
  for (const m of members) {
    await prisma.membership.upsert({
      where: { userId_orgId: { userId: m.userId, orgId: org.id } },
      update: { role: m.role },
      create: { userId: m.userId, orgId: org.id, role: m.role },
    } as any);
  }

  const pipeline = await prisma.pipeline.upsert({
    where: { id: 'demo-pipeline' },
    update: {},
    create: { id: 'demo-pipeline', orgId: org.id, name: 'Sales' },
  });
  const stages = await prisma.$transaction([
    prisma.stage.upsert({ where: { id: 's1' }, update: {}, create: { id: 's1', orgId: org.id, pipelineId: pipeline.id, name: 'New', order: 1 } }),
    prisma.stage.upsert({ where: { id: 's2' }, update: {}, create: { id: 's2', orgId: org.id, pipelineId: pipeline.id, name: 'Qualified', order: 2 } }),
    prisma.stage.upsert({ where: { id: 's3' }, update: {}, create: { id: 's3', orgId: org.id, pipelineId: pipeline.id, name: 'Won', order: 3 } }),
  ]);

  for (let i = 1; i <= 15; i++) {
    const company = await prisma.company.create({ data: { orgId: org.id, name: `Company ${i}` } });
    const contact = await prisma.contact.create({ data: { orgId: org.id, companyId: company.id, email: `lead${i}@example.com`, firstName: `Lead${i}`, lastName: 'Demo', tags: ['lead'] } });
    await prisma.deal.create({ data: { orgId: org.id, contactId: contact.id, stageId: stages[i % 3].id, value: Math.round(Math.random() * 1000) / 10, currency: 'EUR', nextActionAt: addDays(new Date(), i % 7) } });
  }

  const form = await prisma.form.create({ data: { orgId: org.id, name: 'Kontakt' } });
  await prisma.formField.createMany({
    data: [
      { orgId: org.id, formId: form.id, type: 'text', label: 'Name', options: [], required: true, order: 1 },
      { orgId: org.id, formId: form.id, type: 'email', label: 'E-Mail', options: [], required: true, order: 2 },
      { orgId: org.id, formId: form.id, type: 'nps', label: 'Empfehlung', options: [], required: false, order: 3 },
    ],
  });
  for (let i = 0; i < 5; i++) {
    await prisma.submission.create({ data: { orgId: org.id, formId: form.id, data: { name: `Lead ${i}`, email: `lead${i}@example.com`, nps: 9 } } });
  }

  await prisma.shortLink.create({ data: { orgId: org.id, slug: 'start', target: 'https://sonanos.example.com/start', utm: { source: 'seed' } } });
  for (let i = 0; i < 10; i++) {
    await prisma.clickEvent.create({ data: { orgId: org.id, shortLinkId: (await prisma.shortLink.findUniqueOrThrow({ where: { slug: 'start' } })).id, userAgent: 'seed', ip: '127.0.0.1' } });
  }

  await prisma.course.create({
    data: {
      orgId: org.id,
      title: 'Onboarding-Kurs',
      lessons: {
        create: [
          { orgId: org.id, title: 'Willkommen', content: 'Intro', order: 1 },
          { orgId: org.id, title: 'Erste Schritte', content: 'Setup', order: 2 },
          { orgId: org.id, title: 'Nächste Schritte', content: 'CRM', order: 3 },
        ],
      },
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

