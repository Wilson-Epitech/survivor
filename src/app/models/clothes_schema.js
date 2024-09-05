import mongoose, { mongo } from 'mongoose';

const clothesSchema = new mongoose.Schema ({
    _id_clothes: Number,
    _id_client: Number,
    _type: String,
    _image: String
  });

export const clothes = mongoose.model("clothes", clothesSchema);
