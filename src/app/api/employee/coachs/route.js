import { mongooseConnect } from '@/lib/mongoose';
import { employee } from '@/models/employee_schema';
import { NextResponse } from 'next/server';

export async function GET(req)
{
    await mongooseConnect();

    try {
        const employees = await employee.find({ _work: "Coach" }, {_id_employee: 1, _name: 1, _surname: 1, _email: 1, _last_connexion: 1});
        return NextResponse.json(employees);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to get employees' }, { status: 404 });
    }
}
