import { mongooseConnect } from '@/lib/mongoose';
import { customer } from '@/models/customer_schema';
import { NextResponse } from 'next/server';

export async function GET(req)
{
    await mongooseConnect();

    const { searchParams } = new URL(req.url);
    const id = parseInt(searchParams.get('id'))

    try {
        const query = id ? { _id_customer: id } : {};
        const res = await customer.find(query, '_image').exec();
        return NextResponse.json(res);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to get customers' }, { status: 404 });
    }
}