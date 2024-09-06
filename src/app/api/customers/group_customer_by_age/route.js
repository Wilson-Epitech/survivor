import { mongooseConnect } from '@/lib/mongoose';
import { customer } from '@/models/customer_schema';
import { NextResponse } from 'next/server';

function fillAgeArray(nbCustomers, res)
{
    let underTwentyFive = 0;
    let underThirtyThree = 0;
    let underFourtyFive = 0;
    let underSixty = 0;
    let underEighty = 0;

    for (let i = 0; i < nbCustomers; i++) {
        let elem = res[i].toObject();
        let birthyear = parseInt(elem._birth_date);
        if (birthyear >= 1999) {
            underTwentyFive++;
        } else if (birthyear >= 1991) {
            underThirtyThree++;
        } else if (birthyear >= 1979) {
            underFourtyFive++;
        } else if (birthyear >= 1964) {
            underSixty++
        } else {
            underEighty++
        }
    }
    return [underTwentyFive, underThirtyThree, underFourtyFive,
        underSixty, underEighty];
}

export async function GET(req)
{
    await mongooseConnect();
    try {
        const res = await customer.find({}, {_birth_date: 1})
        const nbCustomers = await customer.countDocuments();
        return NextResponse.json(fillAgeArray(nbCustomers, res));
    } catch (error) {
        return NextResponse.json({ error: 'Failed to get customers' }, { status: 500 });
    }
}
