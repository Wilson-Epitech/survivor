import { mongooseConnect } from '@/lib/mongoose';
import { encounter } from '@/models/encounter_schema';
import { NextResponse } from 'next/server';

export async function GET(req)
{
    await mongooseConnect();

    const { searchParams } = new URL(req.url);
    const id = parseInt(searchParams.get('id'))

    try {
        const query = id ? { _customer_id: id } : {};
        const res = await encounter.find(query, '_date _rating _comment _source').exec();
        return NextResponse.json(res);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to get date info' }, { status: 404 });
    }
}