# Sonanos Webapp

## Local Dev
- cp .env.example .env
- npm install
- npx prisma migrate dev --name init
- npm run prisma:seed
- npm run dev

## Fly.io Deploy
1. Ensure a managed Postgres is available (Fly Postgres or external). Set `DATABASE_URL` in Fly secrets:
   - fly secrets set DATABASE_URL=... NEXTAUTH_SECRET=... EMAIL_FROM=...
2. Build & deploy:
   - fly launch --no-deploy (first time, or edit fly.toml)
   - fly deploy
3. Run migrations on deploy:
   - fly ssh console -C "npx prisma migrate deploy" (or add release command in Fly config)

Dockerfile uses Next.js standalone output; server serves on port 3000.