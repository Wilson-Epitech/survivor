import { mongooseConnect } from '@/lib/mongoose';
import { NextResponse } from 'next/server';
import { event } from '@/models/event_schema';

export async function GET(req)
{
    await mongooseConnect();

    try {
        const res = await event.find({}, {_id_event: 1});
        return NextResponse.json(res);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to get events' }, { status: 404 });
    }
}
