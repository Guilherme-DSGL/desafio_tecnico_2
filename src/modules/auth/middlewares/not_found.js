const responseMessages = require('../../../common/constants/response_messages');
const statusCode = require('../../../common/constants/statusCode');


const notFoundRoute = (req, res) => {
    return res.status(statusCode.NOT_FOUND).json({ mensagem: responseMessages.notFoundRoute });
};

module.exports = notFoundRoute;