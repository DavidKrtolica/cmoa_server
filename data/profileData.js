import db from '../knex.js';

export const fetchByAccountId = async (accountId) => {
   return await db
      .select('*')
      .from('profile')
      .where('accountId', accountId)
      .first();
};

export const createProfile = async (profile) => {
   return await db('profile').insert(profile);
};

export const updateProfile = async (profileId, profile) => {
   return await db('profile').update(profile).where('id', profileId);
};
