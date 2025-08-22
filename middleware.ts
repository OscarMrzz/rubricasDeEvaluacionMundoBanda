import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const url = request.nextUrl.pathname;
  // Buscar cualquier cookie de sesión de Supabase que empiece con 'sb-'
  const supabaseToken = Object.entries(request.cookies)
    .find(([key]) => key.startsWith('sb-'))?.[1]?.value;
  if (url.startsWith('/PanelControlPage') && !supabaseToken) {
    return NextResponse.redirect(new URL('/authPage/SignInPage', request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/PanelControlPage/:path*'],
};