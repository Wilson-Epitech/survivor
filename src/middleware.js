import { NextResponse } from 'next/server'
import { cookies } from 'next/headers';
import { verifyToken } from './app/login/handleToken';

const protectedRoutes = ['/', '/coaches', '/tips', '/customer', '/wardrobe', '/compatibility', '/clients'];

export default function middleware(req) {
    const path = req.nextUrl.pathname;
    const isProtectedRoute = protectedRoutes.includes(path);
    const jwtToken = cookies().get('jwt-token')?.value;

    if (isProtectedRoute && !jwtToken)
        return NextResponse.redirect(new URL('/login', req.nextUrl));

    const decoded = verifyToken(jwtToken);
    if (isProtectedRoute && !decoded)
        return NextResponse.redirect(new URL('/login', req.nextUrl));
    return NextResponse.next();
}
