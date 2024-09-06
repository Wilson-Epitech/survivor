import { mongooseConnect } from '@/lib/mongoose';
import { employee } from '@/models/employee_schema';
import { NextResponse } from 'next/server';

export async function GET(req)
{
    await mongooseConnect();

    try {
        const employees = await Employee.find();
        return NextResponse.json(employees);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to get employees' }, { status: 404 });
    }
}
