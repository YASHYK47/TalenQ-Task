const Data = require("../models/data");

const getData = async (query) => {
  try {
    const data = await Data.findOne(query);
    if (!data) {
      throw new Error("No data with provided query object");
    }
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

const removeData = async (query) => {
  try {
    const data = await Data.findOneAndRemove(query);
    if (!data) {
      throw new Error("No data with provided query object");
    }
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

const addData = async (body) => {
  try {
    if (!body) {
      throw new Error("No data provided with body");
    }
    const data = new Data(body);
    await data.save();
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

const updateData = async (query, body) => {
  try {
    if (!body) {
      throw new Error("No data provided with body");
    }
    const data = await Data.findOneAndUpdate(
      query,
      { $set: body },
      { new: true }
    );
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  addData,
  getData,
  updateData,
  removeData,
};
