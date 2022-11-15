import db from '../knex.js';

export const fetchById = async (id) => {
   return await db.select('*').from('artwork').where('id', id).first();
};

export const fetchAll = async () => {
   return await db.select('*').from('artwork');
};
