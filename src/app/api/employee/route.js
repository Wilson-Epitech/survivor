import { mongooseConnect } from '@/lib/mongoose';
import { Employee } from '@/app/models/Employee';
import { NextResponse } from 'next/server';
// import { User } from '@/app/models/Users';

export async function GET(req)
{
    await mongooseConnect();

    try {
        const employees = await Employee.find();
        return NextResponse.json(employees);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to get employees' }, { status: 500 });
    }
}