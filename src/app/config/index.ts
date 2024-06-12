import dotenv from 'dotenv';

dotenv.config();

const config = {
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
  Bcrypt_Hash_Round: process.env.BCRYPT_HASH_ROUND,
};

export default config;
