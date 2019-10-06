const crypto = require("crypto-js");

/**
 * An encrypter that can AES encrypt/decrypt a string.
 */
class Encrypter {
  /**
   *
   * @param password the password/keyphrase used for the encryption/decryption.
   */
  constructor(password) {
    this.password = password;
  }

  /**
   * Encrypt a string
   *
   * @param {string} value the string to be encrypted
   * @return {string} the encrypted string
   */
  encryptString(value) {
    return crypto.AES.encrypt(value, this.password).toString();
  }

  /**
   * Decrypt a string
   *
   * @param {string} value the string to be decrypted
   * @return {string} the decrypted string
   */
  decryptString(value) {
    return crypto.AES.decrypt(value, this.password).toString(crypto.enc.Utf8);
  }
}

module.exports = Encrypter;


