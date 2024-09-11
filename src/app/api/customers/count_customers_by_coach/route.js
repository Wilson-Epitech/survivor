import { mongooseConnect } from '@/lib/mongoose';
import { customer } from '@/models/customer_schema';
import { NextResponse } from 'next/server';

export async function GET(req) {
    await mongooseConnect();

    const { searchParams } = new URL(req.url);
    const id = parseInt(searchParams.get('id'));

    try {
        const query = id ? { _coach: id } : {};
        const res = await customer.countDocuments(query);
        return NextResponse.json({_nb: res, _id: id});
    } catch (error) {
        return NextResponse.json({ error: 'Failed to get customer' }, { status: 404 });
    }top
}
