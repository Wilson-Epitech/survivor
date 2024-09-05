import mongoose, { mongo } from 'mongoose';
import {tip} from "../../mongoose_schemas/tip_schema"

const uri = "***REMOVED***";

mongoose.connect(uri);

export default async function Page() {
  try {
    let url = `https://soul-connection.fr/api/tips`;
    const data = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-Group-Authorization": "***REMOVED***",
        Authorization: `Bearer ***REMOVED***`
        }
    });

    const tipData = await data.json()

    for(let tip_i = 0; tip_i < tipData.length; tip_i++) {
      let obj = tipData[tip_i];
      console.log(`
        id: ${obj.id}
        title: ${obj.title}
        tip: ${obj.tip}
      `);

      try {
        tip.create({
          _id: obj.id,
          _title: obj.title,
          _tip: obj.tip
        })
      } catch (error) {
        console.error('Error inserting employees ${id_empl}:', error);
      }
    }
  } catch (error) {
    console.error('Error fetching employees:', error);
  }
}