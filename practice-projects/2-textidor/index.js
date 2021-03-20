"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const config = require("./config");

const app = express();
app.use(express.json());
// - setup -
const FILES_DIR = __dirname + "/text-files";
// create the express app

// - use middleware -
// allow Cross Origin Resource Sharing
app.use(cors());
// parse the body
app.use(bodyParser.json());

// https://github.com/expressjs/morgan#write-logs-to-a-file
const accessLogStream = fs.createWriteStream(
  path.join(__dirname, "access.log"),
  { flags: "a" }
);
app.use(morgan("combined", { stream: accessLogStream }));
// and log to the console
app.use(morgan("dev"));

// statically serve the frontend
app.use(express.static("public"));

// - declare routes -
// helpful hint:
//  open /public/actions.js next to this file
//  can you figure out which action calls which route?
//  which http method does each action use?
//  what route does each one call?

// read all file names
//  called in init.js
//  redirected to by other routes
app.get("/files", (req, res, next) => {
  fs.readdir(FILES_DIR, (err, list) => {
    if (err && err.code === "ENOENT") {
      res.status(404).end();
      return;
    }
    if (err) {
      // https://expressjs.com/en/guide/error-handling.html
      next(err);
      return;
    }

    res.json(list);
  });
});

// read a file
//  called by action: fetchAndLoadFile
app.get("/files/:fileName", (req, res, next) => {
  const fileName = req.params.fileName;
  fs.readFile(`${FILES_DIR}/${fileName}`, "utf-8", (err, fileText) => {
    if (err) {
      console.error(err);
      return;
    }
    if (!fileName) {
      console.log("the file does not  existed");
      return;
    }

    const responseData = {
      name: fileName,
      text: fileText,
    };
    res.json(responseData);
  });
});

// write a file
//  called by action: saveFile
app.post("/files/:fileName", (req, res, next) => {
  const fileName = req.params.fileName; // read from params
  const fileText = req.body.text; // read from body
  console.log(req.body.text);
  fs.writeFile(`${FILES_DIR}/${fileName}`, fileText, (err) => {
    if (err) {
      console.err(err);
      return;
    }

    // https://stackoverflow.com/questions/33214717/why-post-redirects-to-get-and-put-redirects-to-put
    res.redirect(303, "/files");
  });
});

// delete a file
//  called by action: deleteFile
app.delete("/files/:fileName", (req, res, next) => {
  const fileName = req.params.fileName; // read from params
  fs.readFile(`${FILES_DIR}/${fileName}`, (err) => {
    if (err) {
      console.error(err);
      return;
    }
    if (!fileName) {
      console.log("the file name is required");
      return;
    }
    fs.unlink(`${FILES_DIR}/${fileName}`, (err) => {
      if (err) {
        req.statusCode(500).send(err);
      }
      console.log("The file has been deleted successfully!");
    });
    res.redirect(303, "/files");
  });
});

// - handle errors in the routes and middleware -
//  this works, nothing to change!

// https://expressjs.com/en/guide/error-handling.html
app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).end();
});

// - open server -
// try to exactly match the message logged by demo.min.js
// set port environments
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Listening on port ${PORT}  ...`));
