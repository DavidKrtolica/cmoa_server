import db from '../knex.js';

export const fetchByEmail = async (email) => {
   return await db.select('*').from('account').where('email', email).first();
};

export const fetchById = async (id) => {
   return await db.select('*').from('account').where('id', id).first();
};

export const createAccount = async (account) => {
   return await db('account').insert(account);
};
