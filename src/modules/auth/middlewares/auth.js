const authenticationConstants = require('../../../common/constants/auth');
const responseMessages = require('../../../common/constants/response_messages');
const statusCode = require('../../../common/constants/statusCode');
const { extractJwtFromAuthHeader, verifyToken } = require('../service/token.service');
const ServerException = require('../../../infrastructure/exception/server_exception');

const checkHeader = (req, res)=> {
    const authHeader = req.headers[authenticationConstants.header];
    const token = authHeader && extractJwtFromAuthHeader(authHeader);
    if(!token){
        return res.status(statusCode.UN_AUTHORIZED).json({mensagem: responseMessages.unAuthorized});
    }
    return token;
};

const authMiddleware = (req, res, next) => {
    try{
        const token = checkHeader(req, res);
        verifyToken(token);
        next();
    }catch(error){
        if(error instanceof ServerException){
            return res.status(error.status).json({mensagem: error.message});
        } 
    }
};

module.exports = authMiddleware;