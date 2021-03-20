const util = require("util");
const path = require("path");
const fs = require("fs");
const tv4 = require("tv4");

const FILE_SCHEMA = require("../data/file-schema.json");
const DATA_PATH = path.join(__dirname, "..", "data", "files-data.json");

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

const handlers = {
  readAll: async (req, res) => {
    try {
      const filesDataString = await readFile(DATA_PATH, "utf-8");
      const filesData = JSON.parse(filesDataString);

      const fileNames = filesData.files.map((entry) => ({
        id: entry.id,
        name: entry.name,
      }));

      res.json(fileNames);
    } catch (err) {
      console.log(err);

      if (err && err.code === "ENOENT") {
        res.status(404).end();
        return;
      }

      next(err);
    }
  },
  readOne: async (req, res) => {
    const fileId = Number(req.params.id);

    try {
      const filesDataString = await readFile(DATA_PATH, "utf-8");
      const filesData = JSON.parse(filesDataString);

      const entryWithId = filesData.files.find((entry) => entry.id === fileId);

      if (entryWithId) {
        res.json(entryWithId);
      } else {
        res.status(404).end();
      }
    } catch (err) {
      console.log(err);

      if (err && err.code === "ENOENT") {
        res.status(404).end();
        return;
      }

      next(err);
    }
  },
  create: async (req, res) => {
    const newFile = req.body;

    try {
      const filesDataString = await readFile(DATA_PATH, "utf-8");
      const filesData = JSON.parse(filesDataString);

      newFile.id = filesData.nextId;
      filesData.nextId++;

      const isValid = tv4.validate(newFile, FILE_SCHEMA);

      if (!isValid) {
        const error = tv4.error;
        console.error(error);

        res.status(400).json({
          error: {
            message: error.message,
            dataPath: error.dataPath,
          },
        });
        return;
      }

      filesData.files.push(newFile);

      const newFileDataString = JSON.stringify(filesData, null, "  ");

      await writeFile(DATA_PATH, newFileDataString);

      res.json(newFile);
    } catch (err) {
      console.log(err);

      if (err && err.code === "ENOENT") {
        res.status(404).end();
        return;
      }

      next(err);
    }
  },
  update: async (req, res) => {
    const idToUpdate = Number(req.params.id);

    const newFile = req.body;
    newFile.id = idToUpdate;
    const isValid = tv4.validate(newFile, FILE_SCHEMA);

    if (!isValid) {
      const error = tv4.error;
      console.error(error);

      res.status(400).json({
        error: {
          message: error.message,
          dataPath: error.dataPath,
        },
      });
      return;
    }

    try {
      const filesDataString = await readFile(DATA_PATH, "utf-8");
      const filesData = JSON.parse(filesDataString);

      const entryToUpdate = filesData.files.find(
        (file) => file.id === idToUpdate
      );

      if (entryToUpdate) {
        const indexOfFile = filesData.files.indexOf(entryToUpdate);
        filesData.files[indexOfFile] = newFile;

        const newFilesDataString = JSON.stringify(filesData, null, "  ");

        await writeFile(DATA_PATH, newFilesDataString);

        res.send(newFile);
      } else {
        res.json(`no entry with id ${idToUpdate}`);
      }
    } catch (err) {
      console.log(err);

      if (err && err.code === "ENOENT") {
        res.status(404).end();
        return;
      }

      next(err);
    }
  },
  delete: async (req, res) => {
    const idToDelete = Number(req.params.id);

    try {
      const filesDataString = await readFile(DATA_PATH, "utf-8");
      const filesData = JSON.parse(filesDataString);

      const entryToDelete = filesData.files.find(
        (file) => file.id === idToDelete
      );

      if (entryToDelete) {
        //filesData.files.filter((file) => file.id !== entryToDelete.id);
        const indexOfFile = filesData.files.indexOf(entryToDelete);
        filesData.files.splice(indexOfFile, 1);

        const newFileDataString = JSON.stringify(filesData, null, "  ");

        await writeFile(DATA_PATH, newFileDataString);

        res.send(entryToDelete);
      } else {
        res.send(`no entry with id ${idToDelete}`);
      }
    } catch (err) {
      console.log(err);

      if (err && err.code === "ENOENT") {
        res.status(404).end();
        return;
      }

      next(err);
    }
  },
};

module.exports = handlers;
