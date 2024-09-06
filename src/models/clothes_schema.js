import { Schema, models, model} from "mongoose";
const mongoose = require('mongoose');

const clothesSchema = new Schema ({
  _id_clothes: {Number},
  _id_client: {Number},
  _type: {String},
  _image: {String}
}, { collection: 'clothes' });

export const clothes = models.clothes || model('clothes', clothesSchema);
