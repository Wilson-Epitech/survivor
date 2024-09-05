import { mongooseConnect } from '@/lib/mongoose';
import { Tips } from '@/app/models/Tips';
import { NextResponse } from 'next/server';
// import { User } from '@/app/models/Users';

export async function GET(req)
{
    await mongooseConnect();

    try {
        const tips = await Tips.find();
        return NextResponse.json(tips);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to get tips' }, { status: 500 });
    }
}