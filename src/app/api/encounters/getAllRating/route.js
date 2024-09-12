import { mongooseConnect } from '@/lib/mongoose';
import { encounter } from '@/models/encounter_schema';
import { NextResponse } from 'next/server';

export async function GET(req)
{
    await mongooseConnect();

    try {
        const encounters = await encounter.find({}, {_rating: 1, _date: 1});
        return NextResponse.json(encounters);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to get encounters rating' }, { status: 404 });
    }
}
