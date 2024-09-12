import { mongooseConnect } from '@/lib/mongoose';
import { NextResponse } from 'next/server';
import { customer } from '@/models/customer_schema';

export async function GET(req)
{
    await mongooseConnect();

    try {
        const res = await customer.find({}, {_name: 1, _surname: 1, _id_customer: 1, _coach: 1, _phone_number: 1, _email: 1});
        return NextResponse.json(res);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to get customers' }, { status: 404 });
    }
}
