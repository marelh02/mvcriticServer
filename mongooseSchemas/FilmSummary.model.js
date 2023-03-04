import { mongoose } from 'mongoose';
const Schema = mongoose.Schema;

let FilmSummarySchema = new Schema({
    summary:String
});

export const FilmSummary = mongoose.model('FilmSummary', FilmSummarySchema);