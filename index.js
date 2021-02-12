const express = require("express");
const app = express();
const cors = require('cors');
const Product = require('./model/product');
const config = require("./config/keys");

//require("dotenv").config();
const mongoose = require("mongoose");

mongoose.connect(config.mongoURI ,
  {
    useNewUrlParser: true, useUnifiedTopology: true,
    useCreateIndex: true, useFindAndModify: false
  })
  .then(() =>{
    const port = 8088;
app.listen(port, () => {
  console.log(`Server Listening on ${port}`)
})
  
    console.log('MongoDB Connected...')
    
})
  .catch(err => console.log(err));

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("./uploads"));
app.use('/users',require('./routes/users'));

app.use('/product',require('./routes/product'));
  