const fs = require("fs");
const path = require("path");
const config = require("../config");

const FILE_DIR = path.join(__dirname, "/..", config.FILES_DIR);

const handlers = {
  getRoot: (req, res) => {
    res.send("home page!");
  },
  getList: (req, res, next) => {
    fs.readdir(FILE_DIR, (err, data) => {
      if (err) {
        next(err);
        return;
      }

      console.log("this is the directory listing", data);
      res.json(data);
    });
  },

  postItem: (req, res, next) => {
    const name = req.query.name;

    // check if file already exists
    const exist = fs.existsSync(path.join(FILE_DIR, name));
    const content = req.body.fileContent;
    // if the file existed then append the content to the existing file
    if (exist) {
      fs.appendFile(`${FILE_DIR}/${name}`, content, (err) => {
        if (err) {
          next(err);
          return;
        }

        res.sendStatus(200);
      });
    } else {
      // if the file doesn't existed then write(create and add content) to the file
      fs.writeFile(`${FILE_DIR}/${name}`, content, (err) => {
        if (err) {
          next(err);
          return;
        }

        res.sendStatus(200);
      });
    }
  },
};

module.exports = handlers;
