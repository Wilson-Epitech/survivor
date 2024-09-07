import { mongooseConnect } from '@/lib/mongoose';
import { customer } from '@/models/customer_schema';
import { NextResponse } from 'next/server';

export async function POST(req) {
    const { method } = req;
    await mongooseConnect();

    if (method === 'POST') {
        try {
            const body = await req.json();
            const {customerId, coachId} = body;

            console.log("customerId", customerId)
            console.log("coachId", coachId)

            if (!customerId || !coachId) {
                return NextResponse.json({ error: 'id_customer and coach id are required' }, { status: 400 });
            }


            const result = await customer.updateOne({_id_customer: customerId}, { _coach: parseInt(coachId) });
            if (result.matchedCount === 0) {
                console.log('No matching customer found.');
                return NextResponse.json({ error: 'No matching customer found' }, { status: 404 });
            }
            if (result.modifiedCount === 0) {
                console.log('No document was updated.');
            }
            return NextResponse.json(result);
        } catch (error) {
            if (error instanceof Error) {
                return NextResponse.json({ error: 'Failed to update customer', details: error.message }, { status: 404 });
            } else {
                return NextResponse.json({ error: 'Failed to update customer', details: 'Unknown error' }, { status: 404 });
            }
        }
    } else {
        return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
    }
}