require('dotenv').config();
const {serverConfig} = require( './infrastructure/config/server.config');
const initDataBase = require('./data/database');
const  server = require('./infrastructure/webserver/server');
const userRouter = require('./modules/user/routes');
const userUrls = require('./common/constants/routes');


initDataBase.then(()=> {
    server.use(userUrls.root, userRouter);

    server.listen(serverConfig.PORT, ()=> {
        console.log('conected');
        console.log('Server is running on port '+serverConfig.PORT);
    });
}).catch((err)=> {
    console.log(err);
});
