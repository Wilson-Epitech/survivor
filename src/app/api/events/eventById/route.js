import { mongooseConnect } from '@/lib/mongoose';
import { event } from '@/models/event_schema';
import { NextResponse } from 'next/server';

export async function GET(req)
{
    await mongooseConnect();

    const { searchParams } = new URL(req.url);
    const id = parseInt(searchParams.get('id'))

    try {
        const query = id ? { _id_event: id } : {};
        const res = await event.find(query, '_name _date _location_name _max_participants').exec();
        return NextResponse.json(res);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to get customers' }, { status: 404 });
    }
}