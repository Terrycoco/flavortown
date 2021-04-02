require('dotenv').config();
const {Pool} = require('pg');
const isProduction = process.env.NODE_ENV === 'production';

const dbConfig = {
  DB_HOST: "ec2-54-145-102-149.compute-1.amazonaws.com",
  DB_DATABASE: "d4p6g2vlprinnr",
  DB_USER:"gizxldqoiambqu",
  DB_PORT: 5432,
  DB_PASSWORD:"33a04573b87c66cd754357b27ca64e321a0681be9bcb8fbf73fe246cce79b9bd"
};


//for working local - still connect to server
const connectionString =
`postgresql://${dbConfig.DB_USER}:${dbConfig.DB_PASSWORD}@${dbConfig.DB_HOST}:${dbConfig.DB_PORT}/${dbConfig.DB_DATABASE}`;

const pool = new Pool({
  connectionString: isProduction ? process.env.DATABASE_URL : connectionString,
  ssl: isProduction,
});

module.exports = {pool}