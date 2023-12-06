import { jwtDecode } from 'jwt-decode';
import { NextRequest, NextResponse } from 'next/server';
import { UserDocument } from './typesDefs/constants/app/users/users.types';
import { AllRoutes } from './constants/routes/routes';

export async function middleware(req: NextRequest) {
  const uid = req.cookies.get('auth');
  const accessToken = req.cookies.get('accessToken');

  const decoded: UserDocument | null = accessToken
    ? await jwtDecode(accessToken?.value as unknown as string)
    : null;

  if (
    (!accessToken || (accessToken && decoded?.permissions !== 'admin')) &&
    !uid &&
    req.nextUrl.pathname.startsWith('/admin')
  ) {
    return NextResponse.redirect(new URL(AllRoutes.ADMIN_LOGIN, req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/admin/:path*'
};
