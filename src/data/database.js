const mongoose = require('mongoose');

const dbUrl = process.env.DB_URL;

const initDataBase = mongoose.connect(dbUrl);


module.exports = initDataBase;