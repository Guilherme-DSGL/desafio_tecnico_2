const express = require('express');
const userUrls = require( '../../common/constants/routes');
const {signUp, signIn, getUser} = require('./controller/user.controller');
const authMiddleware = require('./middlewares/auth');
const contentTypeJson = require('./middlewares/content_type_json');
const { validateSignUpBody, validateSignInBody } = require('./controller/validators');

const userRouter = () => {
    const router = express.Router();

    router.post(
        userUrls.signIn,
        contentTypeJson,
        validateSignInBody,
        signIn,
    );
    router.post(
        userUrls.signUp,
        contentTypeJson,
        validateSignUpBody,
        signUp
    );
    router.get(
        userUrls.getUser,
        authMiddleware,
        getUser,
    );
    return router;
};

module.exports = userRouter;

