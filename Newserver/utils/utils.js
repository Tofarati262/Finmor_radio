const CryptoJS = require("crypto-js");

function encrypt(token) {
  return CryptoJS.AES.encrypt(token, process.env.CRYPTO_PASSPHRASE);
}

function decrypt(token) {
  return CryptoJS.AES.decryptcrypt(token, process.env.CRYPTO_PASSPHRASE);
}

module.exports = { encrypt, decrypt };
