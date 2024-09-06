import { mongooseConnect } from '@/lib/mongoose';
import { encounter } from '@/models/encounter_schema';
import { NextResponse } from 'next/server';

export async function GET(req)
{
    await mongooseConnect();
    let countRatingArray = [];

    try {
        for (let i = 0; i < 5; i++) {
            let countRating = await encounter.countDocuments({_rating: i+1});
            countRatingArray.push(countRating);
        }
        return NextResponse.json(countRatingArray);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to get encounters' }, { status: 404 });
    }
}
