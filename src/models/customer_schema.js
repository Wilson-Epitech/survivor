import { Schema, models, model} from "mongoose";

const CustomerSchema = new Schema ({
    _id: {type: Number},
    _id_customer: {type: Number},
    _email: {type: String},
    _name: {type: String},
    _surname: {type: String},
    _birth_date: {type: String},
    _description: {type: String},
    _astrological_sign: {type: String},
    _phone_number: {type: String},
    _address: {type: String},
    _coach: {type: Number},
  }, { collection: 'customers' });


export const customer = models.customer || model('customer', CustomerSchema);