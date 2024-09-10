import { mongooseConnect } from '@/lib/mongoose';
import { employee } from '@/models/employee_schema';
import { NextResponse } from 'next/server';

export async function GET(req)
{
    await mongooseConnect();

    try {
        const res = await employee.find({}, {_id_employee: 1});
        return NextResponse.json(res);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to get customers' }, { status: 404 });
    }
}