import { NextResponse } from 'next/server'
import { cookies } from 'next/headers';
import { verifyToken } from './app/login/handleToken';

const protectedRoutes = ['/', '/coaches', '/tips', '/customer', '/wardrobe', '/astrological', '/clients', '/statistic'];

export default async function middleware(req) {
    const path = req.nextUrl.pathname;
    const isProtectedRoute = protectedRoutes.includes(path);
    const jwtToken = cookies().get('jwtToken')?.value;

    if (!isProtectedRoute)
        return NextResponse.next();
    if (!jwtToken)
        return NextResponse.redirect(new URL('/login', req.nextUrl));

    const decoded = await verifyToken(jwtToken);
    if (!decoded)
        return NextResponse.redirect(new URL('/login', req.nextUrl));
    return NextResponse.next();
}
