import dotenv from 'dotenv';
dotenv.config();

export default {
   client: 'postgresql',
   connection: process.env.DB_CONNECTION_STRING,
   useNullAsDefault: true,
};
