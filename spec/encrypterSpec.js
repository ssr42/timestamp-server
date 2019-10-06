const Encrypter = require("../encrypter");

describe("Encrypter", () => {
  it("should be able to encrypt and decrypt a string", () => {
    let encrypter = new Encrypter("secret");
    let str = "hello";
    let encryptedStr = encrypter.encryptString(str);
    let decryptedStr = encrypter.decryptString(encryptedStr);
    expect(decryptedStr).toEqual(str);
  });

  it("should be not be able to decrypt a string encrypted using a different password", () => {
    let encrypter = new Encrypter("secret");
    let encrypter2 = new Encrypter("secret2");
    let str = "hello";
    let encryptedStr = encrypter.encryptString(str);
    let decryptedStr = encrypter2.decryptString(encryptedStr);
    expect(decryptedStr).not.toEqual(str);
  });
});