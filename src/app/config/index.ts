import dotenv from 'dotenv';

dotenv.config();

const config = {
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
  Bcrypt_Hash_Round: process.env.BCRYPT_HASH_ROUND,
  jwt_access_secret: process.env.JWT_ACCESS_SECRET,
  jwt_access_expires_in: process.env.JWT_ACCESS_EXPIRES_IN,
};

export default config;
