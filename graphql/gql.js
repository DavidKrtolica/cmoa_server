import { gql } from 'apollo-server-express';
import * as artworkData from '../data/artworkData.js';
import * as artistData from '../data/artistData.js';
import * as profileData from '../data/profileData.js';
import * as accountData from '../data/accountData.js';

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

   type Address {
      addressLine: String!
      zip: String!
      city: String!
      region: String
      country: String!
   }

   type Account {
      id: ID!
      email: String!
      role: String!
   }

   type Profile {
      id: ID!
      firstName: String
      lastName: String
      phone: String
      birthDate: String
      gender: String
      address: Address
      about: String
      account: Account!
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
      artworks(search: String): [Artwork]!
      artist(id: ID!): Artist!
      artists: [Artist]!
      artworkPage(artworkId: ID!): ArtworkPage!
      artistPage(artistId: ID!): ArtistPage!
      profile(accountId: ID!): Profile
   }

   input AddressInput {
      addressLine: String!
      zip: String!
      city: String!
      region: String
      country: String!
   }

   input ProfileInput {
      firstName: String!
      lastName: String!
      phone: String!
      birthDate: String!
      gender: String!
      address: AddressInput!
      about: String!
      accountId: ID!
   }

   type Mutation {
      saveProfile(profile: ProfileInput!, profileId: ID): Boolean!
   }
`;

// Resolvers for the types defined in the schema
export const resolvers = {
   Artist: {
      artworksCount: async (parent) => {
         return await artworkData.countByArtist(parent.id);
      },
   },
   Profile: {
      account: async (parent) => {
         const account = accountData.fetchById(parent.accountId);
         return account;
      },
   },
   Query: {
      profile: async (_, { accountId }) => {
         const profile = await profileData.fetchByAccountId(accountId);
         return profile;
      },
      artwork: async (_, { id }) => {
         const artwork = await artworkData.fetchById(id);
         return artwork;
      },
      artworks: async (_, { search }) => {
         const artworks = await artworkData.fetch(search);
         return artworks;
      },
      artist: async (_, { id }) => {
         const artist = await artistData.fetchById(id);
         return artist;
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
   Mutation: {
      saveProfile: async (_, { profile, profileId }) => {
         try {
            if (!profileId) {
               await profileData.createProfile(profile);
            } else {
               await profileData.updateProfile(profileId, profile);
            }
            return true;
         } catch (error) {
            return false;
         }
      },
   },
};
