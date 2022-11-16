import db from '../knex.js';

export const fetchById = async (id) => {
   return await db.select('*').from('artist').where('id', id).first();
};

export const fetchAll = async () => {
   return await db.select('*').from('artist');
};