import { gql } from 'apollo-server-express';
import * as artworkData from '../data/artworkData.js';

// The graphql schema
export const typeDefs = gql`
   type Artwork {
      id: ID!
      title: String!
      creationYear: Int
      medium: String!
      curatorDescription: String
      itemHeight: Float
      itemWidth: Float
      itemDepth: Float
      itemDiameter: Float
      artistNote: String
      image: String!
      creatorId: String!
      submittedAt: String!
   }

   type Query {
      artwork(id: ID!): Artwork!
      artworks: [Artwork]!
   }
`;

// Resolvers for the types defined in the schema
export const resolvers = {
   Query: {
      artwork: async (_, { id }) => {
         const result = await artworkData.fetchById(id);
         console.log(result);
         return result;
      },
      artworks: () => artworkData.fetchAll(),
   },
};
