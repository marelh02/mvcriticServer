import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { readFileSync } from 'fs';
import { mongoose } from 'mongoose';
import { resolvers } from './resolvers.js';
import { User } from './mongooseSchemas/User.model.js';
import { Artist } from './mongooseSchemas/Artist.model.js';
import { FilmDescription } from './mongooseSchemas/FilmDescription.model.js';
import { FilmSummary } from './mongooseSchemas/FilmSummary.model.js';

const PORT = 4000


//Mongoose setup
const uri = "mongodb+srv://pikupiku:77jBW3Osp2CIoEp5@cluster0.rycgi4b.mongodb.net/?retryWrites=true&w=majority?directConnection=true"
// const uri="mongodb://mongo:Z206s6ksHyjX1DyzdeUq@containers-us-west-45.railway.app:7705/test?directConnection=true"
mongoose.set('strictQuery', true);
// await mongoose.connect('mongodb://127.0.0.1:27017/mvcritic').then(() => console.log("🦦 Mongoose connection established succefully"));

await mongoose.connect(
  uri,
  { useNewUrlParser: true, useUnifiedTopology: true },
).then(
  () => console.log(" 🦦 Mongoose is connected man ")
).catch(e=>{
  console.log("*** Ay, we fucked up man ***");
  console.log(e);
})

//

const typeDefs = readFileSync('./types.gql', { encoding: 'utf-8' });


const server = new ApolloServer({
  typeDefs,
  resolvers
});


const { url } = await startStandaloneServer(server, {
  context:async ()=>({
    User: User,
    Artist:Artist,
    FilmDescription:FilmDescription,
    FilmSummary:FilmSummary
  }),
  listen: { port: process.env.PORT || PORT },
});

console.log(`🚀  Server ready at: ${url}`);