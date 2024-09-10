import { mongooseConnect } from '@/lib/mongoose';
import { employee } from '@/models/employee_schema';
import axios from 'axios';
import { set } from 'mongoose';
import { NextResponse } from 'next/server';

export async function POST(req) {
    const { method } = req;
    await mongooseConnect();

    if (method === 'POST') {
        try {
            const body = await req.json();
            const {_email, _name, _surname, _birth_date, _gender, _work, _image} = body;

            console.log(_image);

            let _id_employee;
            let _ids_employees = [];
            try {
                const response = await axios.get(`http://localhost:3000/api/employee/get_id`);
                const employees = response.data;
                _ids_employees = employees.map(employee => employee._id_employee);
                const maxId = Math.max(..._ids_employees);
                _id_employee = maxId + 1;
            } catch (error) {
                return NextResponse.json({ error: 'Failed to get employees ID' }, { status: 500 });
            }

            const result = await employee.create({_id_employee, _email, _name, _surname, _birth_date, _gender, _work, _image});
            return NextResponse.json(result);
        } catch (error) {
            if (error instanceof Error) {
                return NextResponse.json({ error: 'Failed to create employee', details: error.message }, { status: 404 });
            } else {
                return NextResponse.json({ error: 'Failed to create employee', details: 'Unknown error' }, { status: 404 });
            }
        }
    } else {
        return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
    }
}
