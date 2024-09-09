import { mongooseConnect } from '@/lib/mongoose';
import { encounter } from '@/models/encounter_schema';
import { NextResponse } from 'next/server';

export async function GET(req)
{
    await mongooseConnect();

    const { searchParams } = new URL(req.url);
    const customer_id = parseInt(searchParams.get('customer_id'));

    try {
        const query = customer_id ? { _customer_id: customer_id } : {};
        const res = await encounter.find(query, {_date: 1});
        return NextResponse.json(res);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to get customers' }, { status: 404 });
    }
}
