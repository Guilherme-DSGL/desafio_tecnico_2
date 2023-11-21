const UserModel = require('../../../data/models/User');


const fetchUserByEmail = async (email) => {
    return await UserModel.findOne({ email: email }, '-password');
};

const getUserForAuthentication = async (email) => {
    return await  UserModel.findOne({ email: email }, );
};

const createUser = async (user) => {
    return await UserModel.create(user);
};

const updateLastLogin = async (id) => {
    return await UserModel.findByIdAndUpdate(id, {
        lastLogin: new Date(),
    }); 
};

const fetchUserById = async (id) => {
    return await UserModel.findById(id, '-password');
};

module.exports = {
    fetchUserByEmail,
    createUser,
    updateLastLogin,
    fetchUserById,
    getUserForAuthentication
};