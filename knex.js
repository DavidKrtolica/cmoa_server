import knex from 'knex';
import dotenv from 'dotenv';

dotenv.config();

const db = knex({
   client: 'postgresql',
   connection: process.env.DB_CONNECTION_STRING,
   useNullAsDefault: true,
});

db.raw('SELECT 1').then(() => {
   console.log('PostgreSQL connected');
});

export default db;
