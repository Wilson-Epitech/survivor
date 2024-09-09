const mongoose = require('mongoose');
const fetch = require('node-fetch');

const CustomerSchema = new mongoose.Schema({
    _id_customer: { type: Number, required: true },
    _email: { type: String, required: true },
    _name: { type: String, required: true },
    _surname: { type: String, required: true },
    _birth_date: { type: String, required: true },
    _gender: { type: String, required: true },
    _description: { type: String, required: true },
    _astrological_sign: { type: String, required: true },
    _phone_number: { type: String, required: true },
    _address: { type: String, required: true },
    _coach: { type: Number, required: true },
    _image: { type: String, required: true }
}, { collection: 'customers' });

const Customer = mongoose.model('customer', CustomerSchema);

async function CustomerToDatabase() {

    try {
        if (mongoose.connection.readyState !== 1) {
            const uri = process.env.MONGODB_URI;
            if (!uri) throw new Error("MONGODB_URI is undefined");
            await mongoose.connect(uri);
        }

        const urlNbCustomer = `https://soul-connection.fr/api/customers`;
        const data = await fetch(urlNbCustomer, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "X-Group-Authorization": "***REMOVED***",
                Authorization: `Bearer ***REMOVED***`
            }
        });

        const customersFromApi = await data.json();

        for (let i = 0; i <= customersFromApi.length; i++) {

            const existingCustomer = await Customer.findOne({ _id_customer: customersFromApi[i].id});

            if (existingCustomer)
                continue;

            let url = `https://soul-connection.fr/api/customers/${customersFromApi[i].id}`;
            const data = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "X-Group-Authorization": "***REMOVED***",
                    Authorization: `Bearer ***REMOVED***`
                }
            });

            const customerData = await data.json()

            const imageUrl = `https://soul-connection.fr/api/customers/${customersFromApi[i].id}/image`;
            const imageResponse = await fetch(imageUrl, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "X-Group-Authorization": "***REMOVED***",
                    Authorization: `Bearer ***REMOVED***`
                }
            });

            const imageBlob = await imageResponse.arrayBuffer();
            const imageBase64 = Buffer.from(imageBlob).toString('base64');

            try {
                await Customer.create({
                    _id_customer: customerData.id,
                    _email: customerData.email,
                    _name: customerData.name,
                    _surname: customerData.surname,
                    _birth_date: customerData.birth_date,
                    _gender: customerData.gender,
                    _description: customerData.description,
                    _astrological_sign: customerData.astrological_sign,
                    _phone_number: customerData.phone_number,
                    _address: customerData.address,
                    _coach: 0,
                    _image: imageBase64
                });
            } catch (error) {
                console.error(`Error inserting customer ${customerData.id}:`, error);
            }
        }
    } catch (error) {
        console.error('Error during CustomerToDatabase execution:', error);
    }
}

module.exports = CustomerToDatabase;
