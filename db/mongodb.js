const mongodb = require("mongodb");
const mongoClient = mongodb.MongoClient;
const config = require("../config/config.js");

mongoClient.connect(
  config.CONNECTION_URL,
  { useNewUrlParser: true },
  (error, client) => {
    if (error) {
      return console.log("Unable to Connect to Database");
    }
    console.log("Connected to Database Successfully");
    const db = client.db(config.DATABASE);
  }
);
