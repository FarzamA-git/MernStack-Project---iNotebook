const mongoose = require('mongoose');
const mongoURI = 'mongodb://127.0.0.1:27017/iNotebook';

const connectToMongoose= async()=>{
    await mongoose.connect(mongoURI);
    console.log("DB connection established!!!")

}

module.exports = connectToMongoose;