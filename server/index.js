const express = require('express');
const cors = require("cors");
const app = express();
const db = require("./db.js");

//middleware
app.use(express.json());
app.use(cors());

let PORT = process.env.PORT || 5000;
if (process.env.NODE_ENV == 'development') {
  PORT = 5000; //force
}
 



// tests connection and returns Postgres server version,
// if successful; or else rejects with connection error:
async function testConnection() {
    const c = await db.connect(); // try to connect
    c.done(); // success, release connection
    return c.client.serverVersion; // return server version
}


//ROUTES
app.get('/testdb', async(req, res) => {
    try {
     const testdb = await testConnection()
     res.send(testdb);
  } catch (err) {
    console.error(err.message);
  }
});

//all items
app.get('/items', (req, res, next) => {
   db.any('select * from items') 
    .then(data => {
      res.send(data);
    })
    .catch(error => {
      console.log('ERROR', error);
    })
});


app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));