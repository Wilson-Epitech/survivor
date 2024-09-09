import { Schema, models, model} from "mongoose";

const orderSchema = new Schema ({
    _id_order: Number,
    _id_client: Number,
    _date: String,
    _payment_method: String,
    _amount: Number,
    _comment: String
  }, {collection: "orders"});

export const order = models['orders'] || model('orders', orderSchema);