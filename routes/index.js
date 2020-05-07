const api = {};

api.includeRoutes = (app) => {
  const file = require("./file");
  const data = require("./data");
  
  app.use("/api/file", file);
  app.use("/api/data", data);
  
};

module.exports = api;
