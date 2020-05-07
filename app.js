const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const upload = require("express-fileupload");

require("./config/config.js");
require("./db/mongoose.js");

const apiRoutes = require("./routes");

//app.use(bodyParser.urlencoded({extended:false}));

var app = express();
app.use(cors());

app.use(bodyParser.json());
app.use(
  upload({
    limits: { fileSize: 1024*1024*1024 },
    abortOnLimit: true,
    responseOnLimit: "File size limit has been reached",
  })
); // Limit set for 1mb

apiRoutes.includeRoutes(app);

app.get("*", (req, res, next) => {
  return next({ message: "I lost!", status: 404 });
});

app.use((err, req, res, next) => {
  res.status(500).json({
    success: false,
    message: err.message,
  });
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Started up at port:${port}`);
});

module.exports = { app };
