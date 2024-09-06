import { mongooseConnect } from '@/lib/mongoose';
import { clothes } from '@/models/clothes_schema';
import { NextResponse } from 'next/server';

export async function GET(req) {
    await mongooseConnect();

    const { searchParams } = new URL(req.url);
    const id = parseInt(searchParams.get('id'));

    try {
        const query = id ? { _id_client: id } : {};
        const clothes = await Clothes.find(query, { _type: 1, _id_clothes: 1 });
        return NextResponse.json(clothes);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to get clothes' }, { status: 500 });
    }
}
