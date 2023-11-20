const CryptoJS = require('crypto-js');

const sha256Encryption = (password) => {
    return CryptoJS.SHA3(password).toString();
};

module.exports = sha256Encryption;