import { mongoose } from 'mongoose';

function successMessage(x) {
    console.log("+++ " + x + " +++");
}

function errorMessage(x, e) {
    console.log("--- " + x + " ---");
    console.log(e.stack);
    console.log("------" * 3);
}

export const resolvers = {
    Query: {
        users: async (_, __, { User }) => {
            return await User.find()
        },
        actors: async (_, __, { Artist }) => {
            return await Artist.find({ role: "actor" })
        },
        directors: async (_, __, { Artist }) => {
            return await Artist.find({ role: "director" })
        },
        filmsDescriptions: async (_, __, { FilmDescription }) => {
            return await FilmDescription.find()
        },
        filmDescription: async (_, { filmId }, { FilmDescription }) => {
            return await FilmDescription.findById(filmId)
        },
        filmSummary: async (_, { filmId }, { FilmSummary }) => {
            return await FilmSummary.findById(filmId)
        },
    },
    Mutation: {
        saveArtist: async (_, { artist }, { Artist }) => {
            console.log("*** Saving request received ***");
            try {
                await new Artist(artist).save()
                successMessage("New artist saved")
                return {
                    success: true,
                    message: "New artist saved succefully"
                }
            } catch (e) {
                errorMessage("Failed to save the new artist", e)
                return {
                    success: false,
                    message: "Could not save the new artist"
                }
            }
        },
        saveFilmDescription: async (_, { filmDescription }, { Artist, FilmDescription }) => {
            console.log("*** Saving request received ***");
            try {
                let fd = filmDescription
                fd.director = await Artist.findById(filmDescription.directorId)
                fd.actors = await Artist.find({
                    '_id': { $in: filmDescription.actorsIds }
                })
                const nfd = new FilmDescription(filmDescription)
                await nfd.save()
                successMessage("New film description saved")
                return {
                    success: true,
                    message: "New film description saved succefully",
                    code: nfd._id
                }
            } catch (e) {
                errorMessage("Failed to save the new film description", e)
                return {
                    success: false,
                    message: "Could not save the new film description"
                }
            }
        },
        saveFilmSummary: async (_, { filmSummary }, { FilmSummary }) => {
            console.log("*** Saving request received ***");
            try {
                await new FilmSummary({
                    "_id": mongoose.Types.ObjectId(filmSummary._id),
                    "summary": filmSummary.summary
                }).save()
                successMessage("New film summary saved")
                return {
                    success: true,
                    message: "New film summary saved succefully"
                }
            } catch (e) {
                errorMessage("Failed to save the new film summary", e)
                return {
                    success: false,
                    message: "Could not save the new film summary"
                }
            }
        },
    }
};
