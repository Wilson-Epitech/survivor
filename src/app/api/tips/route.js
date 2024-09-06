import { mongooseConnect } from '@/lib/mongoose';
import { tip } from '@/models/tip_schema';
import { NextResponse } from 'next/server';
// import { User } from '@/app/models/Users';

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