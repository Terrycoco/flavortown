const express = require('express');
const cors = require("cors");
const app = express();
const pool = require("./db.js");

//middleware
app.use(express.static("client"));
app.use(cors());
app.use(express.json());


//ROUTES
app.get("/", async(req, res) => {
  res.send("<h1>Hello World!</h1>")
})





app.listen(process.env.PORT || 3000, 
  () => console.log("Server is running..."));