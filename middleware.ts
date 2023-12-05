import { jwtDecode } from 'jwt-decode';
import { NextRequest, NextResponse } from 'next/server'
import { UserDocument } from './typesDefs/constants/app/users/users.types';

export async function middleware(req: NextRequest) {
  const uid = req.cookies.get("auth");
  const accessToken = req.cookies.get("accessToken");

  const decoded: UserDocument = await jwtDecode(accessToken?.value as unknown as string)

  if ((!accessToken || (accessToken && decoded.permissions !== 'admin')) && !uid && req.nextUrl.pathname.startsWith('/admin')) {    
    return NextResponse.redirect(new URL('/login', req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: '/admin/:path*',
}
