require('dotenv').config();
const initDataBase = require('./data/database');
const  server = require('./server');
const userRouter = require('./modules/auth/routes');
const statusCode = require('./common/constants/statusCode');


initDataBase;


server.use(userRouter());
server.use((req, res) => {
    return res.status(statusCode.NOT_FOUND).json({ mensagem: 'Rota nao encontrada' });
});
const port = process.env.PORT;
server.listen(port, ()=> {
    console.log('conected');
    console.log('Server is running on port '+port);
});
