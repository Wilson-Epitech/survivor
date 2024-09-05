import { mongooseConnect } from '@/lib/mongoose';
import { Customers } from '@/app/models/Customers';
import { NextResponse } from 'next/server';

export async function GET(req)
{
    await mongooseConnect();

    const { searchParams } = new URL(req.url);
    const id = parseInt(searchParams.get('id'))
    
    try {
        const query = id ? { _id_customer: id } : {};
        const customers = await Customers.find(query, '_image').exec();
        return NextResponse.json(customers);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to get customers' }, { status: 500 });
    }
}