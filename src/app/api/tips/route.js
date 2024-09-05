import { mongooseConnect } from '@/lib/mongoose';
import { NextResponse } from 'next/server';
import { tip } from '@/models/tip_schema';

export async function GET(req)
{
    await mongooseConnect();

    try {
        const tips = await tip.find();
        return NextResponse.json(tips);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to get tips' }, { status: 500 });
    }
}