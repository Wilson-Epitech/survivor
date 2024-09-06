import { Schema, models, model} from "mongoose";
const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema ({
    _id_event: Number,
    _name: String,
    _date: String,
    _max_participants: Number,
    _location_x: mongoose.Decimal128,
    _location_y: mongoose.Decimal128,
    _type: String,
    _employee_id: Number,
    _location_name: String
  }, {collection: 'events'});

export const event = models.event || model("events", eventSchema);