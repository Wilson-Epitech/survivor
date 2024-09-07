import mongoose, { mongo } from 'mongoose';
import {customer} from "../../mongoose_schemas/customer_schema"

const uri = "***REMOVED***";

mongoose.connect(uri);

export default async function Page() {
  try {
    for (let i = 0; i <= 100; i++) {
      let id_custo = i.toString();
      let url = `https://soul-connection.fr/api/customers/${id_custo}`;
      const data = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "X-Group-Authorization": "***REMOVED***",
          Authorization: `Bearer ***REMOVED***`
          }
      });

      const customerData = await data.json()

      console.log(`
        ID: ${customerData.id}
        Email: ${customerData.email}
        Name: ${customerData.name}
        Surname: ${customerData.surname}
        Birthday: ${customerData.birth_date}
        Gender: ${customerData.gender}
        Description: ${customerData.description}
        Astrological Sign: ${customerData.astrological_sign}
        Phone Number: ${customerData.phone_number}
        Address: ${customerData.address}
      `);

      let imageUrl = `https://soul-connection.fr/api/customers/${id_custo}/image`;

      const imageResp = await fetch(imageUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "X-Group-Authorization": "***REMOVED***",
          Authorization: `Bearer ***REMOVED***`
          }
      });

      const imageBlob = await imageResp.arrayBuffer();
      const imageBase64 = Buffer.from(imageBlob).toString('base64');

      console.log(`Image URL: ${imageBase64}`);

      try {
        customer.create({
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
          _image: imageBase64})
      } catch (error) {
        console.error('Error inserting employees ${id_custo}:', error);
      }
    }
  } catch (error) {
    console.error('Error fetching employees:', error);
  }
}