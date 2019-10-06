const express = require("express");
const path = require("path");
const timestampRouter = require("./routes/timestamp");

const app = express();

app.use(express.static(path.join(__dirname, "public")));
app.use("/timestamp", timestampRouter);

module.exports = app;
