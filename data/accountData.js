import db from '../knex.js';

export const fetchByEmail = async (email) => {
   return await db.select('*').from('account').where('email', email).first();
};

export const createAccount = async (account) => {
   return await db('account').insert(account);
};
