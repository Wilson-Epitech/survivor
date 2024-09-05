import mongoose, { mongo } from 'mongoose';
import {clothes} from "../../mongoose_schemas/clothes_schema"

const uri = "***REMOVED***";

mongoose.connect(uri);

export default async function Page() {
  try {
    for (let i = 0; i <= 100; i++) {
      let cust_id = i.toString();
      let url = `https://soul-connection.fr/api/customers/${cust_id}/clothes`;
      const data = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "X-Group-Authorization": "***REMOVED***",
          Authorization: `Bearer ***REMOVED***`
          }
      });

      const clothesData = await data.json()

      for(let clothes_i = 0; clothes_i < clothesData.length; clothes_i++) {
        let obj = clothesData[clothes_i];

        let imageUrl = `https://soul-connection.fr/api/clothes/${obj.id}/image`;

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

        try {
          clothes.create({
            _id_clothes: obj.id,
            _id_client: i,
            _type: obj.type,
            _image: imageBase64})
        } catch (error) {
          console.error('Error inserting employees ${id_empl}:', error);
        }
      }
    }
  } catch (error) {
    console.error('Error fetching employees:', error);
  }
}