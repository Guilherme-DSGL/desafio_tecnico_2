
const responseMessages = require('../../../common/constants/response_messages');
const statusCode = require('../../../common/constants/statusCode');
const { fetchUserByEmail, createUser, updateLastLogin, fetchUserById, getUserForAuthentication } = require('../repository/user.repository');
const { sha256Encryption } = require('../../../infrastructure/encrypt/encrypt');
const ServerException = require('../../../infrastructure/exception/server_exception');
const UserEntity = require('../entity/UserEntity');
const { createToken } = require('./token.service');


const getUserByEmail = async (email) => {
    return await fetchUserByEmail(email);
};

const getUserById = async (id) => {
    const user = await fetchUserById(id);
    return UserEntity.fromDb(user);
};

const registerUser = async (user) => {
    if (await getUserByEmail(user.email)) {
        throw new ServerException(responseMessages.emailAlreadyInUse, statusCode.CONFLICT);
    }
    user.password = sha256Encryption(user.password);
    user.lastLogin = new Date();
    const userResp = await createUser(user);
    const userEntity = UserEntity.fromDb(userResp);
    userEntity.token = createToken(userEntity.id);
    return userEntity;
};

const authenticateUser = async (userReq) => {
    const user = await getUserForAuthentication(userReq.email, sha256Encryption(userReq.password));
    if(!user){
        throw new ServerException(responseMessages.wrongEmailPass, statusCode.UN_AUTHORIZED);
    }
    const userUpdated = await updateLastLogin(user, new Date());
    const userEntity = UserEntity.fromDb(userUpdated);
    userEntity.token = createToken(userEntity.id);
    return userEntity;
};

module.exports = {
    getUserByEmail,
    registerUser,
    authenticateUser,
    getUserById
};