import { mongooseConnect } from '@/lib/mongoose';
import { customer } from '@/models/customer_schema';
import { NextResponse } from 'next/server';
import { customer } from '@/models/customer_schema';

export async function GET(req)
{
    await mongooseConnect();

    try {
        const res = await customer.find({}, {_name: 1, _surname: 1, _id_customer: 1});
        return NextResponse.json(res);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to get customers' }, { status: 500 });
    }
}