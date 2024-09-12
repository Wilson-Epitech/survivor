import { mongooseConnect } from '@/lib/mongoose';
import { order } from '@/models/order_schema';
import { NextResponse } from 'next/server';

export async function GET(req)
{
    await mongooseConnect();

    try {
        const orders = await order.find({}, {_amount: 1, _date: 1});
        return NextResponse.json(orders);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to get timed orders' }, { status: 500 });
    }
}
