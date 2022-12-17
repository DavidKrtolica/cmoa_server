import db from '../knex.js';
import * as Sentry from '@sentry/node';

export const fetchById = async (id) => {
   return await db.select('*').from('artwork').where('id', id).first();
};

export const fetchAll = async () => {
   return await db.select('*').from('artwork');
};

export const fetchByArtist = async (artistId) => {
   return await db.select('*').from('artwork').where('creatorId', artistId);
};

export const fetch = async (search) => {
   try {
      const query = db.select('artwork.*').from('artwork');
      if (search) {
         query
            .whereILike('title', `%${search}%`)
            .orWhereILike('medium', `%${search}%`)
            .orWhereILike('curatorDescription', `%${search}%`);
      }
      return await query;
   } catch(err) {
      Sentry.captureException(err);
   }
};

export const countByArtist = async (artistId) => {
   const result = await db
      .count()
      .from('artwork')
      .where('creatorId', artistId)
      .first();
   return Number(result.count);
};
