import { Schema, models, model} from "mongoose";

const eventSchema = new Schema ({
    _id_event: Number,
    _name: String,
    _date: String,
    _max_participants: Number,
    _location_x: Number,
    _location_y: Number,
    _type: String,
    _employee_id: Number,
    _location_name: String
  }, {collection: 'events'});

export const event = models.event || model("event", eventSchema);