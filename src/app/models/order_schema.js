import mongoose, { mongo } from 'mongoose';

const orderSchema = new mongoose.Schema ({
    _id_order: Number,
    _id_client: Number,
    _date: String,
    _payment_method: String,
    _amount: Number,
    _comment: String
  });

export const order = mongoose.model("orders", orderSchema);