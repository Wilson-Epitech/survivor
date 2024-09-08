import { NextResponse } from 'next/server'
import { cookies } from 'next/headers';
import { verifyToken } from './app/login/handleToken';
import { getEmployeeRole } from "@/app/login/getEmployeeInfos";

const protectedRoutes = ['/', '/coaches', '/tips', '/customer', '/wardrobe',
        '/astrological', '/clients', '/statistic'];

const coachUnauthorizedRoutes = ['/coaches', '/statistic'];

export default async function middleware(req) {
    const path = req.nextUrl.pathname;
    const isProtectedRoute = protectedRoutes.includes(path);
    const isCoachUnauthorizedRoute = coachUnauthorizedRoutes.includes(path);
    const jwtToken = cookies().get('jwtToken')?.value;
    const employeeRole = await getEmployeeRole();

    if (isProtectedRoute && !jwtToken || isProtectedRoute && !employeeRole)
        return NextResponse.redirect(new URL('/login', req.nextUrl));
    if (path.startsWith(`/api/`) && !jwtToken || path.startsWith(`/api/`) && !employeeRole)
        return NextResponse.json({ error: 'Unauthorized access' }, { status: 401 });

    const decoded = verifyToken(jwtToken);
    if (isProtectedRoute && !decoded)
        return NextResponse.redirect(new URL('/login', req.nextUrl));
    if (path.startsWith(`/api/`) && !decoded)
        return NextResponse.json({ error: 'Unauthorized access' }, { status: 401 });
    if (isCoachUnauthorizedRoute && employeeRole === "Coach")
        return NextResponse.redirect(new URL('/', req.nextUrl));

    return NextResponse.next();
}
