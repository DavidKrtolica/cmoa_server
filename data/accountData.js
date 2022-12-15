import db from '../knex.js';
import * as Sentry from '@sentry/node';

export const fetchByEmail = async (email) => {
   try {
      return await db.select('*').from('account').where('email', email).first();
   } catch(error) {
      Sentry.captureException(error);
   }
};

export const createAccount = async (account) => {
   return await db('account').insert(account);
};
