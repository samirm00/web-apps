const fs = require("fs");
const path = require("path");
const config = require("../config");

// define FILES_DIR
const FILES_DIR = path.join(__dirname, "./files-dev");

// declare the handlers
const handlers = {
  readFolder: (req, res) => {
    fs.readdir("api/files", (req, res, next) => {
      if (err && err.code === "ENOENT") {
        res.status(404).end();
        return;
      }
      if (err) {
        next(err);
        return;
      }

      res.json(list);
    });
  },

  readFile: (req, res, next) => {
    const fileName = req.params.name;
    fs.readFile(`${FILES_DIR}/${fileName}`, "utf-8", (err, fileText) => {
      if (err && err.code === "ENOENT") {
        res.status(404).end();
        return;
      }
      if (err) {
        next(err);
        return;
      }

      const responseData = {
        name: fileName,
        text: fileText,
      };
      res.json(responseData);
    });
  },

  writeFile: (req, res, next) => {
    const fileName = req.params.name;
    const fileText = req.body.text;
    fs.writeFile(`${FILES_DIR}/${fileName}`, fileText, (err) => {
      if (err && err.code === "ENOENT") {
        res.status(404).end();
        return;
      }
      if (err) {
        next(err);
        return;
      }
      res.redirect(303, "/api/files");
    });
  },

  deleteFile: (req, res, next) => {
    const fileName = req.params.name;
    fs.unlink(`${FILES_DIR}/${fileName}`, (err) => {
      if (err && err.code === "ENOENT") {
        res.status(404).end();
        return;
      }
      if (err) {
        next(err);
        return;
      }

      // refactor hint:
      res.redirect(303, "/api/files");
      // handlers.getFiles(req, res, next);
    });
  },
};

// export the handlers
module.exports = handlers;
