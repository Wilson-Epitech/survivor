import { Schema, models, model} from "mongoose";
const mongoose = require('mongoose');

const TipsSchema = new Schema ({
  id: {type: Number, required: true},
  title: {type: String, required: true},
  tip: {type: String, required: true},
}, { collection: 'tips' });

export const Tips = models.Tips || model('Tips', TipsSchema);
// export const Employee = mongoose.models.Employee || mongoose.model("Employee", EmployeeSchema);