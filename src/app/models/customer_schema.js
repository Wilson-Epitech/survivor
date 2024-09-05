import mongoose, { mongo } from 'mongoose';

const customerSchema = new mongoose.Schema ({
    _id_customer: Number,
    _email: String,
    _name: String,
    _surname: String,
    _birth_date: String,
    _gender: String,
    _description: String,
    _astrological_sign: String,
    _phone_number: String,
    _address: String,
    _image: String
});

export const customer = mongoose.model("customers", customerSchema);
