require('dotenv').config();
const initDataBase = require('./data/database');
const  server = require('./server');
const userRouter = require('./modules/auth/routes');
const corsConfig = require('./infrastructure/config/cors');
const notFoundRoute = require('./modules/auth/middlewares/not_found');


initDataBase();

server.use(corsConfig);
server.use(userRouter());
server.use(notFoundRoute);

const port = process.env.PORT;
server.listen(port, ()=> {
    console.log('conected');
    console.log('Server is running on port '+port);
});

module.exports = server;
