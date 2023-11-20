const mongoose = require('mongoose');

const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASS;

const initDataBase = mongoose.connect(`mongodb+srv://${dbUser}:${dbPassword}@cluster0.k5sjmoq.mongodb.net/?retryWrites=true&w=majority`);


module.exports = initDataBase;