const mongoose = require('mongoose');
require('dotenv').config();
const config = require('./default');

const dbHost = process.env.DB_HOST || 'localhost';
const dbPort = process.env.DB_PORT || 27017;
const dbName = process.env.DB_DATABASE || 'files_manager';

const dbURL = `mongodb://${dbHost}:${dbPort}/${dbName}`;

const connectDB = async () => {
  try {
    await mongoose.connect(dbURL);
    console.log('MongoDB Connected');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
