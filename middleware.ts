import { NextResponse, type NextRequest } from 'next/server';
import { auth } from '@/lib/auth';

const APP_PATHS = ['/dashboard', '/funnels', '/crm', '/calendar', '/forms', '/surveys', '/blog', '/academy', '/courses', '/automations', '/email', '/links', '/analytics', '/integrations', '/settings', '/support', '/onboarding'];

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const isApp = APP_PATHS.some((p) => pathname === p || pathname.startsWith(`${p}/`));
  if (!isApp) return NextResponse.next();
  const session = await auth();
  if (!session) {
    const url = new URL('/signin', req.url);
    url.searchParams.set('redirect', pathname);
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\.\[a-zA-Z0-9]+$).*)'],
};

