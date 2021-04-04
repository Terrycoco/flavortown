const promise = require('bluebird');
const initOptions = {
  promiseLib: promise
};
const pgp = require('pg-promise')(initOptions);


let ssl = null;
if (process.env.NODE_ENV === 'development') {
   ssl = {rejectUnauthorized: false};
}
const config = {
  connectionString: "postgres://gizxldqoiambqu:33a04573b87c66cd754357b27ca64e321a0681be9bcb8fbf73fe246cce79b9bd@ec2-54-145-102-149.compute-1.amazonaws.com:5432/d4p6g2vlprinnr",
  max:30,
  ssl:ssl
};

const db = pgp(config);


module.exports = db;


 


