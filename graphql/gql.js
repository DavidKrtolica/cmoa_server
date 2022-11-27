import { gql } from 'apollo-server-express';
import * as artworkData from '../data/artworkData.js';
import * as artistData from '../data/artistData.js';

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

   type Artist {
      id: ID!
      fullName: String!
      citedName: String
      nationality: String
      birthDate: String
      birthPlace: String
      deathPlace: String
   }

   type Query {
      artwork(id: ID!): Artwork!
      artworks: [Artwork]!
      artist(id: ID!): Artist!
      artists: [Artist]!
   }
`;

// Resolvers for the types defined in the schema
export const resolvers = {
   Query: {
      artwork: async (_, { id }) => {
         const result = await artworkData.fetchById(id);
         return result;
      },
      artworks: () => artworkData.fetchAll(),
      artist: async (_, { id }) => {
         const result = await artistData.fetchById(id);
         return result;
      },
      artists: () => artistData.fetchAll(),
   },
};
