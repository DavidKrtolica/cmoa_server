import db from '../knex.js';

export const fetchByAccountId = async (accountId) => {
   return await db
      .select('*')
      .from('profile')
      .where('accountId', accountId)
      .first();
};
