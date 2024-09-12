import { mongooseConnect } from '@/lib/mongoose';
import { NextResponse } from 'next/server';
import { customer } from '@/models/customer_schema';

export async function GET(req)
{
    await mongooseConnect();

    try {
        const res = await customer.find({}, {_astrological_sign: 1});
        return NextResponse.json(res);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to get customers\' astrological sign' }, { status: 404 });
    }
}
