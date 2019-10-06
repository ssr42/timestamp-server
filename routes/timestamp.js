const express = require("express");
const TimestampGenerator = require("../timestamp-generator");
const Encrypter = require("../encrypter");
const logger = require('simple-node-logger').createSimpleLogger({ timestampFormat:'YYYY-MM-DD HH:mm:ss.SSS' });
const config = require('minimist')(process.argv.slice(2));

const password = config.password || "secret";
logger.info("Will use the password '"+password+"' for encryption.");
const encrypter = new Encrypter(password);
const generator = new TimestampGenerator("*/1 * * * *");
const router = express.Router();
router.get("/", async (req, res) => {
  logger.info("Timestamp requested.");
  let timestamp = await generator.getCurrentTimestamp();
  timestamp = encrypter.encryptString(timestamp);
  let value = { timestamp: timestamp };
  logger.info("Returning value: ", value);
  res.json(value);
});

module.exports = router;
