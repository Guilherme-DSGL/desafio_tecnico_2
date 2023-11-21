const cors = require('cors');

const corsConfig = cors({
    optionsSuccessStatus: 200,
    origin: '*',
    methods: ['GET', 'POST'],
});

module.exports = corsConfig;