import { mongooseConnect } from '@/lib/mongoose';
import { Customers } from '@/app/models/Customers';
import { NextResponse } from 'next/server';
// import { User } from '@/app/models/Users';

export async function GET(req)
{
    await mongooseConnect();

    try {
        const customers = await Customers.find();
        return NextResponse.json(customers);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to get customers' }, { status: 500 });
    }
}