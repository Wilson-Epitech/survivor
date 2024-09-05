// import mongoose, { mongo, model } from 'mongoose';

// const customerSchema = new mongoose.Schema ({
//     _id_customer: Number,
//     _email: String,
//     _name: String,
//     _surname: String,
//     _birth_date: String,
//     _gender: String,
//     _description: String,
//     _astrological_sign: String,
//     _phone_number: String,
//     _address: String,
//     _image: String
// });

// export const customer = model.customer || mongoose.model("customers", customerSchema);

import { Schema, models, model} from "mongoose";

const CustomerSchema = new Schema ({
    id: {type: Number, required: true},
    id_customer: {type: Number, required: true},
    email: {type: String, required: true},
    name: {type: String, required: true},
    surname: {type: String, required: true},
    birth_date: {type: String, required: true},
    description: {type: String, required: true},
    astrological_sign: {type: String, required: true},
    phone_number: {type: String, required: true},
    address: {type: String, required: true},
  }, { collection: 'customers' });

export const customer = models.customer || model('customer', CustomerSchema);
// export const Employee = mongoose.models.Employee || mongoose.model("Employee", EmployeeSchema);