import { mongooseConnect } from '@/lib/mongoose';
import { encounter } from '@/models/encounter_schema';
import { NextResponse } from 'next/server';

export async function GET(req)
{
    await mongooseConnect();

    try {
        const count = await encounter.countDocuments();
        return NextResponse.json(count);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to get encounters' }, { status: 500 });
    }
}
