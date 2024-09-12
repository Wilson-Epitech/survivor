import { mongooseConnect } from '@/lib/mongoose';
import { customer } from '@/models/customer_schema';
import { NextResponse } from 'next/server';

export async function POST(req) {
    const { method } = req;
    await mongooseConnect();

    if (method === 'POST') {
        try {
            const body = await req.json();
            const {_email, _name, _surname, _birth_date, _gender, _description, _astrological_sign, _phone_number, _address, _image, } = body;

            let _id_customer = 0;
            let _coach = 0;
            let _ids_customers = [];
            try {
                const customers = await customer.find({}, { _id_customer: 1 });
                _ids_customers = customers.map(customer => customer._id_customer);
                const maxId = Math.max(..._ids_customers);
                _id_customer = maxId + 1;
            } catch (error) {
                return NextResponse.json({ error: 'Failed to get employees ID' }, { status: 500 });
            }

            const result = await customer.create({_id_customer, _email, _name, _surname, _birth_date, _gender, _description, _astrological_sign, _phone_number, _address, _coach, _image });
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
