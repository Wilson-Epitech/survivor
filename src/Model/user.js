import mongoose, {model, Schema} from "mongoose";

const UserSchema = new Schema({
  title: {type:String, required:true},
});

export const User = model('User', UserSchema);