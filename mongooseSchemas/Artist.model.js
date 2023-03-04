import { mongoose } from 'mongoose';
const Schema = mongoose.Schema;

let ArtistSchema = new Schema({
    name: String,
    familyName:String,
    nationality:String,
    description:String,
    img:String,
    role:String,
    gender:String
});

export const Artist = mongoose.model('Artist', ArtistSchema);