import { Schema, models, model} from "mongoose";
const mongoose = require('mongoose');

const EmployeeSchema = new Schema ({
    id: {type: Number, required: true},
    email: {type: String, required: true},
    name: {type: String, required: true},
    surname: {type: String},
    birth_date: {type: String},
    gender: {type: String},
    work: {type: String},
    image: {type: String},
  }, { collection: 'employees' });

export const Employee = models.Employee || model('Employee', EmployeeSchema);
// export const Employee = mongoose.models.Employee || mongoose.model("Employee", EmployeeSchema);