import { mongooseConnect } from '@/lib/mongoose';
import { event } from '@/models/event_schema';
import { NextResponse } from 'next/server';

export async function GET(req)
{
    await mongooseConnect();

    try {
        const count = await event.countDocuments();
        return NextResponse.json(count);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to get events' }, { status: 404 });
    }
}
