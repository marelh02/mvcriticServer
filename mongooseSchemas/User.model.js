import { mongoose } from 'mongoose';
const Schema = mongoose.Schema;

let UserSchema = new Schema({
    fullName:String,
    email:{
        type: String,
        unique: true
      },
    password:String
});

export const User = mongoose.model('User', UserSchema);