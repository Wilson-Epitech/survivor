import { mongooseConnect } from '@/lib/mongoose';
import { Employee } from '@/models/Employee';
import { User } from '@/models/User';
import { NextResponse } from 'next/server';

export async function POST(req) {
    const { method } = req;
    await mongooseConnect();

    if (method === 'POST') {
        try {
            const body = await req.json();
            const {name, email} = body;

            if (!name || !email) {
                return NextResponse.json({ error: 'name and mail are required' }, { status: 400 });
            }

            const result = await User.create({name, email});
            return NextResponse.json(result);
        } catch (error) {
            if (error instanceof Error) {
                return NextResponse.json({ error: 'Failed to create product', details: error.message }, { status: 500 });
            } else {
                return NextResponse.json({ error: 'Failed to create product', details: 'Unknown error' }, { status: 500 });
            }
        }
    } else {
        return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
    }
}