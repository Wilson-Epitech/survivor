const mongoose = require('mongoose');
const fetch = require('node-fetch');

const eventSchema = new mongoose.Schema ({
    _id_event: Number,
    _name: String,
    _date: String,
    _duration: Number,
    _max_participants: Number,
    _location_x: Number,
    _location_y: Number,
    _type: String,
    _employee_id: Number,
    _location_name: String
  }, {collection: 'events'});

const event = mongoose.model('event', eventSchema);

async function eventsToDatabase() {

  try {

    if (mongoose.connection.readyState !== 1) {
      const uri = process.env.MONGODB_URI;
      if (!uri) throw new Error("MONGODB_URI is undefined");
      await mongoose.connect(uri);
    }

    let urlNumberEvents = `https://soul-connection.fr/api/events`;
    const data = await fetch(urlNumberEvents, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-Group-Authorization": "***REMOVED***",
        Authorization: `Bearer ***REMOVED***`
      }
    });

    const eventsNbr = await data.json();

    for (let i = 0; i <= eventsNbr.length; i++) {

      const existingEvents = await event.findOne({ _id_event: eventsNbr[i].id});

      if (existingEvents)
        continue;

      let url = `https://soul-connection.fr/api/events/${eventsNbr[i].id}`;
      const data = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "X-Group-Authorization": "***REMOVED***",
          Authorization: `Bearer ***REMOVED***`
          }
      });

      const eventData = await data.json()

      console.log(`
        ID_Event: ${eventData.id},
        Name: ${eventData.name},
        Date: ${eventData.date},
        Duration: ${eventData.duration},
        Max_Participants: ${eventData.max_participants},
        Location X:${eventData.location_x},
        Location Y: ${eventData.location_y},
        Type: ${eventData.type},
        Employee ID: ${eventData.employee_id},
        Location Name: ${eventData.location_name}
      `)

      try {
        event.create({
          _id_event: eventData.id,
          _name: eventData.name,
          _date: eventData.date,
          _duration: eventData.duration,
          _max_participants: eventData.max_participants,
          _location_x: eventData.location_x,
          _location_y: eventData.location_y,
          _type: eventData.type,
          _employee_id: eventData.employee_id,
          _location_name: eventData.location_name
        })
      } catch (error) {
        console.error('Error inserting events ${evt_id}:', error);
      }
    }
  } catch (error) {
    console.error('Error fetching events:', error);
  }
}

module.exports = eventsToDatabase;
