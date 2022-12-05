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
      artworksCount: Int
   }

   type ArtworkPage {
      artwork: Artwork!
      artist: Artist!
   }

   type ArtistPage {
      artist: Artist!
      artworks: [Artwork]
   }

   type Query {
      artwork(id: ID!): Artwork!
      artworks: [Artwork]!
      artist(id: ID!): Artist!
      artists: [Artist]!
      artworkPage(artworkId: ID!): ArtworkPage!
      artistPage(artistId: ID!): ArtistPage!
   }
`;

// Resolvers for the types defined in the schema
export const resolvers = {
   Artist: {
      artworksCount: async (parent) => {
         return await artworkData.countByArtist(parent.id);
      },
   },
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
      artworkPage: async (_, { artworkId }) => {
         const artwork = await artworkData.fetchById(artworkId);
         const artist = await artistData.fetchByArtworkId(artworkId);
         return {
            artwork,
            artist,
         };
      },
      artistPage: async (_, { artistId }) => {
         const artist = await artistData.fetchById(artistId);
         const artworks = await artworkData.fetchByArtist(artistId);
         return {
            artist,
            artworks,
         };
      },
   },
};
