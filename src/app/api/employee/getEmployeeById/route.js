import { mongooseConnect } from '@/lib/mongoose';
import { employee } from '@/models/employee_schema';
import { NextResponse } from 'next/server';

export async function GET(req)
{
    await mongooseConnect();

    const { searchParams } = new URL(req.url);
    const id = parseInt(searchParams.get('id'))

    try {
        const query = id ? { _id_employee: id } : {};
        const res = await employee.find(query, '_name _surname').exec();
        return NextResponse.json(res);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to get employee by ID' }, { status: 404 });
    }
}
