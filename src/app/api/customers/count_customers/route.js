import { mongooseConnect } from '@/lib/mongoose';
import { customer } from '@/models/customer_schema';
import { NextResponse } from 'next/server';

export async function GET(req)
{
    await mongooseConnect();

    try {
        const count = await customer.countDocuments();
        return NextResponse.json(count);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to get customers' }, { status: 500 });
    }
}
