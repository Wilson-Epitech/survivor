import mongoose, { mongo } from 'mongoose';
import {encounter} from "../../mongoose_schemas/encounter_schema"

const uri = "***REMOVED***";

mongoose.connect(uri);

export default async function Page() {
  try {
    for (let i = 0; i <= 800; i++) {
      let encount_id = i.toString();
      let url = `https://soul-connection.fr/api/encounters/${encount_id}`;
      const data = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "X-Group-Authorization": "***REMOVED***",
          Authorization: `Bearer ***REMOVED***`
          }
      });

      const encounterData = await data.json()

      console.log(`
        id: ${encounterData.id}
        id_client: ${encounterData.customer_id}
        date: ${encounterData.date}
        rating: ${encounterData.rating}
        comment: ${encounterData.comment}
        source: ${encounterData.source}
      `);

      try {
        encounter.create({
          _id: encounterData.id,
          _customer_id: encounterData.customer_id,
          _date: encounterData.date,
          _rating: encounterData.rating,
          _comment: encounterData.comment,
          _source: encounterData.source
        })
      } catch (error) {
        console.error('Error inserting employees ${id_empl}:', error);
      }  
    }
  } catch (error) {
    console.error('Error fetching employees:', error);
  }
}