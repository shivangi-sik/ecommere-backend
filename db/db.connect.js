//connecting with database

const mongoose = require('mongoose')
require("dotenv").config()
// Access your MongoDB connection string from secrets
const mongoURI = process.env.MONGODB

//use mongoose to connect
const initializeDatabase = async() =>{
  try{
   const connection = await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })

    if(connection){
      console.log("Connected Successfully");
    }
  }
catch(error) {
  console.log("Connection Failed", error)
}
}
module.exports = {initializeDatabase}
