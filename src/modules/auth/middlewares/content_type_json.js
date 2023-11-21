const { isEqual } = require('lodash');
const statusCode = require('../../../common/constants/statusCode');
const responseMessages = require('../../../common/constants/response_messages');

const contentTypeJson = (req, res, next) => {
    if(!isEqual(req.headers['content-type'], 'application/json')){
        return res.status(statusCode.UNSUSPORTED_MEDIA_TYPE).json({ mensagem: responseMessages.jsonOnly });
    }
    next();
};

module.exports = contentTypeJson;