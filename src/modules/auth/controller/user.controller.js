const statusCode = require('../../../common/constants/statusCode');
const { registerUser, authenticateUser, getUserById } = require('../service/user.service');
const  User  = require('../entity/UserEntity');
const { extractJwtFromAuthHeader,  extractIdFromToken } = require('../service/token.service');
const ServerException = require('../../../infrastructure/exception/server_exception');
const responseMessages = require('../../../common/constants/response_messages');
const authenticationConstants = require('../../../common/constants/auth');


const handleError = (err, res) => {
    if(err instanceof ServerException){
        return res.status(err.status).json({ menssagem: err.message});
    }else {
        console.log(err);
        return res.status(statusCode.SERVER_ERROR).json({ mensagem: responseMessages.internalError});
    }
};

const signUp = async (req, res) => {
    const user = User.fromJson(req.body); 
    try {
        const loggedUser = await registerUser(user);
        return res.status(statusCode.RESOURCE_CREATED).json(loggedUser.getUserDetails());
    } catch (error) {
        handleError(error, res);
    }
};

const signIn = async (req, res) => {
    try {
        const userReq = User.fromJson(req.body); 
        const authenticatedUser = await authenticateUser(userReq);
        return res.status(statusCode.SUCCESS).json(authenticatedUser.getUserDetails());
    } catch (error) {
        handleError(error, res);
    }
};

const getUser = async (req, res) => {
    const authHeader = req.headers[authenticationConstants.header];
    const token = extractJwtFromAuthHeader(authHeader);
    try{
        const id =  extractIdFromToken(token);
        const user = await getUserById(id);
        return res.status(statusCode.SUCCESS).json(user.getUserDetails());
    }catch(error){
        handleError(error, res);
    }
};


module.exports = {
    signUp,
    signIn,
    getUser,
};