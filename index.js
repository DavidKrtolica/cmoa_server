import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import cors from 'cors';
import { typeDefs, resolvers } from './graphql/gql.js';
import * as Sentry from '@sentry/node';
import '@sentry/tracing';
import authRouter from './routers/authRouter.js';

const app = express();

Sentry.init({
   dsn: "https://9690430e385e4e0092bc83bcac71b752@o4504332530876416.ingest.sentry.io/4504332532973568",
   tracesSampleRate: 1.0,
});
app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.tracingHandler());
app.use(Sentry.Handlers.errorHandler());

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/auth', authRouter);

const apolloServer = new ApolloServer({
   typeDefs,
   resolvers,
});

await apolloServer.start();
apolloServer.applyMiddleware({ app });

app.listen({ port: process.env.PORT || 8080 }, () =>
   console.log(`🚀 Server ready at http://localhost:8080/graphql`)
);
