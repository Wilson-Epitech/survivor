import { mongooseConnect } from '@/lib/mongoose';
import { NextResponse } from 'next/server';
import { event } from '@/models/event_schema';

export async function GET(req)
{
    await mongooseConnect();

    try {
        const res = await event.find({}, {_id_event: 1, _name: 1, _date: 1, _location_x: 1, _location_y: 1, _location_name: 1, _max_participants: 1, _type: 1});
        return NextResponse.json(res);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to get events' }, { status: 404 });
    }
}
