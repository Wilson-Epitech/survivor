import mongoose, { mongo, models, model } from 'mongoose';

const employeeSchema = new mongoose.Schema ({
    _id_employee: {type: Number, required: true},
    _email: {type: String, required: true},
    _name: {type: String, required: true},
    _surname: {type: String, required: true},
    _birth_date: {type: String, required: true},
    _gender: {type: String, required: true},
    _work: {type: String, required: true},
    _image: {type: String, required: true}
  });

export const employee = models.employee || model('employee', employeeSchema);