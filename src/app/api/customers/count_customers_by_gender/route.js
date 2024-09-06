import { mongooseConnect } from '@/lib/mongoose';
import { customer } from '@/models/customer_schema';
import { NextResponse } from 'next/server';

export async function GET(req)
{
    await mongooseConnect();

    try {
        let countMen = await customer.countDocuments({_gender: "Male"});
        let countWomen = await customer.countDocuments({_gender: "Female"});
        return NextResponse.json([countMen, countWomen]);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to get customers' }, { status: 500 });
    }
}
