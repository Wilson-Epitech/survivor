import mongoose, { mongo, models, model } from 'mongoose';

const encounterSchema = new mongoose.Schema ({
    _id_encounter: Number,
    _customer_id: Number,
    _date: String,
    _rating: Number,
    _comment: String,
    _source: String
});

export const encounter = models.encounter || model('encounter', encounterSchema);