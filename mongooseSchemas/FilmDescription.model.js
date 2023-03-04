import { mongoose } from 'mongoose';
import { Artist } from './Artist.model.js';


const Schema = mongoose.Schema;

let FilmDescriptionSchema = new Schema({
    title:String,
    nationality:String,
    releaseDate:String,
    coverImg:String,
    genres:[String],
    director:Artist.schema,
    actors:[Artist.schema],
});

export const FilmDescription = mongoose.model('FilmDescription', FilmDescriptionSchema);