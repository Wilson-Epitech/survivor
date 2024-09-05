import { Schema, models, model} from "mongoose";

// delete models['User']; -> pour supprimer le dernier model stocker en cache suite a l'update du model

const UserSchema = new Schema ({
    name: {type: String, required: true},
    email: {type: String, required: true},
  }, { collection: 'wilson' });

export const User = models.User || model('User', UserSchema);