import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import * as Sentry from '@sentry/node';

import * as accountData from '../data/accountData.js';

const SALT_ROUNDS = 10;
const router = express.Router();

//Create new account
router.post('/register', async (req, res) => {
   try {
      //Check for duplicate username or email
      const account = await accountData.fetchByEmail(req.body.email);
      if (account) {
         Sentry.captureMessage('Trying register with an already existing email address - failed!');
         res.status(403).send({
            error: 'Email address is already in use',
         });
      } else {
         //Password hashing
         bcrypt.genSalt(SALT_ROUNDS, (error, salt) => {
            bcrypt.hash(req.body.password, salt, async (error, hash) => {
               const account = await accountData.createAccount({
                  email: req.body.email,
                  salt: salt,
                  hash: hash,
                  role: 'curator',
               });

               res.status(201).send({
                  success: 'Account successfully created',
                  //account: account,
               });
            });
         });
      }
   } catch (error) {
      Sentry.captureException(error);
      res.status(500).send({ error: error.message });
   }
});

router.post('/login', async (req, res) => {
   try {
      const account = await accountData.fetchByEmail(req.body.email);
      if (!account) {
         Sentry.captureMessage('Trying login with an invalid email address - failed!');
         res.status(401).send({ error: 'Invalid email' });
      } else {
         const hash = account.hash;
         const id = account.id;

         let token = jwt.sign(
            {
               id,
            },
            process.env.JWT_SECRET,
            {
               expiresIn: 3600, //One hour
            }
         );

         bcrypt.compare(req.body.password, hash, (error, isMatching) => {
            if (isMatching) {
               res.status(200).send({
                  token: token,
                  id: account.id,
                  email: account.email,
                  role: account.role,
               });
            } else {
               Sentry.captureMessage('Trying login with wrong password - failed!');
               res.status(401).send({ error: 'Invalid password' });
            }
         });
      }
   } catch (error) {
      Sentry.captureException(error);
      res.status(500).send({ message: error.message });
   }
});

export default router;
