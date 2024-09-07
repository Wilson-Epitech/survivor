import { NextResponse } from 'next/server'
import { cookies } from 'next/headers';
import { verifyToken } from './app/login/handleToken';
import { unsealData } from "iron-session";

const protectedRoutes = ['/', '/coaches', '/tips', '/customer', '/wardrobe', '/astrological', '/clients', '/statistic'];

export default async function middleware(req) {
    const path = req.nextUrl.pathname;
    const isProtectedRoute = protectedRoutes.includes(path);
    const jwtToken = cookies().get('jwt-token')?.value;
    const userRoleCookie = cookies().get("user-role")?.value;

    if (isProtectedRoute && !jwtToken)
        return NextResponse.redirect(new URL('/login', req.nextUrl));

    const decoded = verifyToken(jwtToken);
    if (isProtectedRoute && !decoded)
        return NextResponse.redirect(new URL('/login', req.nextUrl));

    if (userRoleCookie) {
        const userRole = await unsealData(userRoleCookie,
            { password: process.env.SECRET_KEY });
        console.log("rôle du user:", userRole);
    }
    return NextResponse.next();
}
