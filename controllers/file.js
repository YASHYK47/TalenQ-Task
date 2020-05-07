const xlsx = require("xlsx");
const Data = require("../models/data");

//Function for finding headers of file
const getAllHeaders = (sheet) => {
  let headers = {};
  let keys = Object.keys(sheet);

  for (let i = 1; i < keys.length - 1; i++) {
    if (keys[i].indexOf("2") != -1) {
      break;
    }
    let headerName = sheet[keys[i]]["v"] ? sheet[keys[i]]["v"] : "";
    headers[sheet[keys[i]]["v"]] = headerName;
  }
  let arrayOfHeaders = [];
  for (var k in headers) arrayOfHeaders.push(k);
  return arrayOfHeaders;
};

//Inserting Data into database
const insert = async (sheet) => {
  try {
    const data = await xlsx.utils.sheet_to_json(sheet);
    if (!data || !data.length) {
      throw new Error("File Empty");
    }
    data.forEach(async (item) => {
      newObj = new Data(item);
      await newObj.save();
    });
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  getAllHeaders,
  insert,
};
