import { mongooseConnect } from '@/lib/mongoose';
import { NextResponse } from 'next/server';
import { getEmployeeID } from "@/app/login/getEmployeeInfos";

export async function GET(req)
{
    await mongooseConnect();

    try {
        const res = await getEmployeeID();
        return NextResponse.json(res);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to get employees' }, { status: 404 });
    }
}
