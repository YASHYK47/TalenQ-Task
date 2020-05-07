const express = require("express");
const router = express.Router();
const {
  addData,
  getData,
  removeData,
  updateData,
} = require("../controllers/data");

//pass your query object as req.query
router.get("/", async (req, res, next) => {
  try {
    const data = await getData(req.query);
    res.json({
      success: true,
      message: "Data fetched successfully!",
      data: data,
    });
  } catch (error) {
    res.json({ success: false, message: error.message, data: {} });
  }
});

//pass your query object as req.query
router.delete("/remove", async (req, res, next) => {
  try {
    const data = await removeData(req.query);
    res.json({
      success: true,
      message: "Data deleted successfully!",
      data: data,
    });
  } catch (error) {
    res.json({ success: false, message: error.message, data: {} });
  }
});

router.post("/add", async (req, res, next) => {
  try {
    const data = await addData(req.body);
    res.json({
      success: true,
      message: "Data added successfully!",
      data: data,
    });
  } catch (error) {
    res.json({ success: false, message: error.message, data: {} });
  }
});

router.patch("/update", async (req, res, next) => {
  try {
    const data = await updateData(req.query, req.body);
    res.json({
      success: true,
      message: "Data updated successfully!",
      data: data,
    });
  } catch (error) {
    res.json({ success: false, message: error.message, data: {} });
  }
});

module.exports = router;
