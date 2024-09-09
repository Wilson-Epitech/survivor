import { NextResponse } from 'next/server'
import { cookies } from 'next/headers';
import { verifyToken } from './app/login/handleToken';
import { getEmployeeRole } from "@/app/login/getEmployeeInfos";

const protectedRoutes = ['/', '/coaches', '/tips', '/customers', '/wardrobe', '/astrological', '/statistics'];

const coachUnauthorizedRoutes = ['/coaches', '/statistics'];

export default async function middleware(req) {
    const path = req.nextUrl.pathname;
    const isProtectedRoute = protectedRoutes.includes(path);
    const jwtToken = cookies().get('jwtToken')?.value;
    const employeeRole = await getEmployeeRole();
    const isCoachUnauthorizedRoute = coachUnauthorizedRoutes.includes(path);

    if (!jwtToken || !employeeRole) {
        if (isProtectedRoute)
            return NextResponse.redirect(new URL('/login', req.nextUrl));
        else if (path.startsWith(`/api/`))
            return NextResponse.json({ error: 'Unauthorized access' }, { status: 401 });
        return NextResponse.next();
    }
    const decoded = await verifyToken(jwtToken);
    if (!decoded) {
        if (path.startsWith(`/api/`) && !decoded)
            return NextResponse.json({ error: 'Unauthorized access' }, { status: 401 });
        return NextResponse.redirect(new URL('/login', req.nextUrl));
    }
    if (isCoachUnauthorizedRoute && employeeRole === "Coach")
        return NextResponse.redirect(new URL('/', req.nextUrl));
    return NextResponse.next();
}
