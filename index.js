import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import cors from 'cors';
import { typeDefs, resolvers } from './graphql/gql.js';
import authRouter from './routers/authRouter.js';

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/auth', authRouter);

const apolloServer = new ApolloServer({ typeDefs, resolvers, introspection: process.env.NODE_ENV === 'production' });

await apolloServer.start();
apolloServer.applyMiddleware({ app });

app.listen({ port: process.env.PORT || 8080 }, () =>
   console.log(`🚀 Server ready at http://localhost:8080/graphql`)
);
