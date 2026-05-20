// middleware.ts
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const cookieStorage = await cookies()

  const token = cookieStorage.get('accessToken')?.value;


  if (!token) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // 3. Continuar con la petición normal
  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/profile/:path*'],
};
