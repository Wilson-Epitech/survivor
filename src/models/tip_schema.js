import { Schema, models, model} from "mongoose";
const mongoose = require('mongoose');

const tipsSchema = new mongoose.Schema ({
    _id_tip: Number,
    _title: String,
    _tip: String
}, { collection: 'tips' });

export const tip = models.tip || model("tips", tipsSchema);