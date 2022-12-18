import db from '../knex.js';

export const fetchById = async (id) => {
   return await db.select('*').from('artist').where('id', id).first();
};

export const fetchAll = async () => {
   return await db.select('*').from('artist');
};

export const fetchByArtworkId = async (artworkId) => {
   return await db
      .select(
         'artist.id',
         'artist.fullName',
         'artist.citedName',
         'artist.nationality',
         'artist.birthPlace',
         'artist.birthDate',
         'artist.deathDate'
      )
      .from('artist')
      .innerJoin('artwork', 'artwork.creatorId', 'artist.id')
      .where('artwork.id', artworkId)
      .first();
};

export const createArtist = async (artist) => {
   return await db('artist').insert(artist).returning('id');
};
