const express = require('express');
const userUrls = require( '../../common/constants/routes');

const userRouter = () => {
    const router = express.Router();

    router.post(
        userUrls.signIn,
        ()=> {}
    );
    router.post(
        userUrls.signUp,
        ()=> {}
    );
    router.put(
        userUrls.logout,
        ()=> {}
    );
    return router;
};

module.exports = userRouter;

