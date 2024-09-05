import { mongooseConnect } from '@/lib/mongoose';
import { customer } from '@/models/customer_schema';
import { NextResponse } from 'next/server';

export async function GET(req)
{
    await mongooseConnect();

    const { searchParams } = new URL(req.url);
    const id = parseInt(searchParams.get('id'));
    console.log("id ici:", id);

    try {
        const query = id ? { _id_customer: id } : {};
        const res = await customer.find(query, {_birth_date: 1, _astrological_sign: 1, _id_customer: 1});
        return NextResponse.json(res);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to get customers' }, { status: 500 });
    }
}


// export async function GET(req) {
//     await mongooseConnect();

//     const { searchParams } = new URL(req.url);
//     const id = parseInt(searchParams.get('id'));

//     try {
//         const query = id ? { _id_client: id } : {};
//         const res = await clothes.find(query, { _type: 1 });
//         return NextResponse.json(res);
//     } catch (error) {
//         return NextResponse.json({ error: 'Failed to get clothes' }, { status: 500 });
//     }
// }