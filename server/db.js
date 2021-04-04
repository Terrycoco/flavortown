const promise = require('bluebird');
const initOptions = {
  promiseLib: promise
};
const pgp = require('pg-promise')(initOptions);

const readConfig = () => {
  fs = require('fs');
  fs.readFile('.env', 'utf8', function (err,data) {
    if (err) {
      return console.log(err);
    }
    //console.log(data);
    return data;
  });
};


let ssl = null;
if (process.env.NODE_ENV === 'development') {
   cn = readConfig();
   ssl = {rejectUnauthorized: false};
}
const config = {
  connectionString: cn,
  max:30,
  ssl:ssl
};

const db = pgp(config);


module.exports = db;


 


