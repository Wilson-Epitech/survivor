import { Schema, models, model} from "mongoose";

const eventSchema = new Schema ({
    _id_event: {type: Number},
    _name: {type: String},
    _date: {type: String},
    _max_participants: {type: Number},
    _location_x: {type: Number},
    _location_y: {type: Number},
    _type: {type: String},
    _employee_id: {type: Number},
    _location_name: {type: String},
  }, {collection: 'events'});

export const event = models.event || model("event", eventSchema);
