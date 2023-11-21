const jwt = require('jsonwebtoken');
const authenticationConstants = require('../../../common/constants/auth');
const { isEqual } = require('lodash');
const ServerException = require('../../../infrastructure/exception/server_exception');
const statusCode = require('../../../common/constants/statusCode');
const responseMessages = require('../../../common/constants/response_messages');

const tokenExpiredError = 'TokenExpiredError';

const extractJwtFromAuthHeader = (authHeader) => {
    return authHeader.split(' ')[1];
};

const verifyToken = (token) => {
    try{
        const secret = process.env.SECRET;
        return jwt.verify(token, secret);
    }catch (e){
        if(isEqual(e.name, tokenExpiredError)){
            throw new ServerException(responseMessages.invalidSession, statusCode.UN_AUTHORIZED);
        }
        throw new ServerException(responseMessages.unAuthorized, statusCode.UN_AUTHORIZED);
    }
};

const extractIdFromToken = (token) => {
    return jwt.decode(token).id;
};

const createToken = (id)=> {
    const secret = process.env.SECRET;
    const token = jwt.sign({
        id: id
    }, secret, {
        expiresIn: authenticationConstants.expirationTime 
    });
    return token;
};

module.exports = {
    extractJwtFromAuthHeader,
    verifyToken,
    extractIdFromToken,
    createToken
};