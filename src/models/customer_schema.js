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