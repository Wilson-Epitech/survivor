import { mongooseConnect } from '@/lib/mongoose';
import { Customers } from '@/app/models/Customers';
import { NextResponse } from 'next/server';

export async function GET(req)
{
    await mongooseConnect();

    try {
        const customers = await Customers.find({}, {_address: 1, _id_customer: 1});
        return NextResponse.json(customers);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to get customers' }, { status: 500 });
    }
}