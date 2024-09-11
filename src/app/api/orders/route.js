import { mongooseConnect } from '@/lib/mongoose';
import { order } from '@/models/order_schema';
import { NextResponse } from 'next/server';

export async function GET(req)
{
    await mongooseConnect();

    const { searchParams } = new URL(req.url);
    const id = parseInt(searchParams.get('id'))

    try {
        const query = id ? { _id_client: id } : {};
        const res = await order.find(query, '_amount _date _comment _payment_method _id_client').exec();
        return NextResponse.json(res);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to get payment' }, { status: 404 });
    }
}
