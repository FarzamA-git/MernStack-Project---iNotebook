const mongoose = require('mongoose');
const mongoURI='mongodb://localhost:27017';

const connectToMongoose=()=>{
    mongoose.connect(mongoURI);
    console.log("DB connection established!!!");

}

module.exports = connectToMongoose;