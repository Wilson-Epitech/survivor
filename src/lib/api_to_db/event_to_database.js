import mongoose, { mongo } from 'mongoose';
import {event} from "../../mongoose_schemas/event_schema"

const uri = "***REMOVED***";

mongoose.connect(uri);

export default async function Page() {
  try {
    for (let i = 0; i <= 301; i++) {
      let evt_id = i.toString();
      let url = `https://soul-connection.fr/api/events/${evt_id}`;
      const data = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "X-Group-Authorization": process.env.X_GROUP_KEY,
          Authorization: `Bearer ***REMOVED***`
          }
      });

      const eventData = await data.json()

      console.log(`
        id: ${eventData.id}
        name: ${eventData.name}
        date: ${eventData.date}
        duration: ${eventData.duration}
        max_participant: ${eventData.max_participants}
        location_x: ${eventData.location_x}
        location_y: ${eventData.location_y}
        type: ${eventData.type}
        employee_id: ${eventData.employee_id}
        location_name: ${eventData.location_name}
      `);

      try {
        event.create({
          _id: eventData.id,
          _name: eventData.name,
          _date: eventData.date,
          _duration: eventData.duration,
          _max_participant: eventData.max_participants,
          _location_x: eventData.location_x,
          _location_y: eventData.location_y,
          _type: eventData.type,
          _employee_id: eventData.employee_id,
          _location_name: eventData.location_name
        })
      } catch (error) {
        console.error('Error inserting employees ${id_empl}:', error);
      }  
    }
  } catch (error) {
    console.error('Error fetching employees:', error);
  }
}