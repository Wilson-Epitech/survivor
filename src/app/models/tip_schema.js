import mongoose, { mongo } from 'mongoose';

const tipsSchema = new mongoose.Schema ({
    _id_tip: Number,
    _title: String,
    _tip: String
});

export const tip = mongoose.model("tips", tipsSchema);