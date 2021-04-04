const fs = require('fs');
const promise = require('bluebird');
const initOptions = {
  promiseLib: promise
};
const pgp = require('pg-promise')(initOptions);

let ssl = null;
let cn = null;
if (process.env.NODE_ENV === 'development') {
  console.log('environment is development');
   cn = fs.readFileSync('.env', 'utf-8'); //pause til loads
   ssl = {rejectUnauthorized: false};
}
const config = {
  connectionString: cn,
  max:30,
  ssl:ssl
};

const db = pgp(config);


module.exports = db;


 


