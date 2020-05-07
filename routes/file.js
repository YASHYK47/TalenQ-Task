const express = require("express");
var randomstring = require("randomstring");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const xlsx = require("xlsx");

const { getAllHeaders, insert } = require("../controllers/file");

//Route for uploading file to server
router.post("/upload", async (req, res, next) => {
  let ts = Date.now();
  const rndm = randomstring.generate(8);
  try {
    if (req.files) {
      let file = req.files.name,
        name = file.name;

      // To get the name of the file
      let arr = name.split(".");
      const type = arr[arr.length - 1];

      // Creating Unique name for the file
      const newFileName = rndm + ts + "." + type;

      //Storing the file on our server
      await file.mv("./excel/" + newFileName, async function (error) {
        if (error) {
          res.send({ success: false, message: error.message, data: {} });
        } else {
          //reading the file
          let wb = xlsx.readFile("./excel/" + newFileName);

          // finding headers of the file
          const headers = await insert(wb.Sheets[wb.SheetNames[0]]);

          // returning the headers of the file
          res.json({
            success: true,
            message: "File uploaded successfully!",
            data: { FileId: newFileName, yourFields: headers },
          });
        }
      });
    } else {
      throw new Error("Unable to read File");
    }
  } catch (error) {
    res.json({ success: false, message: error.message, data: {} });
  }
});

//Route for the user to download file
router.get("/download", (req, res, next) => {
  const fileId = req.body.fileId;
  try {
    // Checking if file exists
    if (fs.existsSync(`./excel/${fileId}`)) {
      res.download(`./excel/${fileId}`);
    } else {
      throw new Error("File not Found");
    }
  } catch (error) {
    res.json({ success: false, message: error.message, data: {} });
  }
});

//Route for the Admin to remove all files
router.get("/removeFiles", (req, res, next) => {
  try {
    fs.readdir("./excel", (err, files) => {
      if (err) throw err;

      for (const file of files) {
        fs.unlink(path.join("./excel", file), (err) => {
          if (err) throw err;
        });
      }
    });
    res.json({
      success: true,
      message: "Files Deleted successfully!",
    });
  } catch (error) {
    res.json({ success: false, message: error.message, data: {} });
  }
});

module.exports = router;
