import dotenv from 'dotenv';

dotenv.config();

export default {
  database_url: process.env.DATABASE_URL,
  test_database_url: process.env.TEST_DATABASE_URL,
  secret: process.env.SECRET_KEY,
  port: process.env.PORT || 8000,
  environment: process.env.NODE_ENV,
}