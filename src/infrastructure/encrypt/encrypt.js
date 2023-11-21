const CryptoJS = require('crypto-js');
const { isEqual } = require('lodash');

const sha256Encryption = (password) => {
    return CryptoJS.SHA256(password).toString();
};

const isEqualEncrypted = (passwordEncrypted, passwordToCompare) => {
    return isEqual(sha256Encryption(passwordToCompare), passwordEncrypted);
};

module.exports = {sha256Encryption, isEqualEncrypted};