import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { typeDefs, resolvers } from './graphql/gql.js';
import authRouter from './routers/authRouter.js';

const app = express();
app.use(express.json());
app.use(
   express.urlencoded({
      extended: true,
   })
);

app.use('/auth', authRouter);

const apolloServer = new ApolloServer({ typeDefs, resolvers });

await apolloServer.start();
apolloServer.applyMiddleware({ app });

app.listen({ port: 8080 }, () =>
   console.log(`🚀 Server ready at http://localhost:8080/graphql`)
);
