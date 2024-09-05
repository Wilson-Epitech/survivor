import { Schema, models, model} from "mongoose";
const mongoose = require('mongoose');

const CustomersSchema = new Schema ({
  id: {type: Number, required: true},
  email: {type: String, required: true},
  name: {type: String, required: true},
  surname: {type: String},
  birth_date: {type: String},
  gender: {type: String},
  work: {type: String},
  image: {type: String},
}, { collection: 'customers' });

export const Customers = models.Customers || model('Customers', CustomersSchema);
