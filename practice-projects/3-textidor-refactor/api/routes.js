// require the handlers
const handlers = require("./handlers.js");
const express = require("express");

// build the router
const router = express.Router();

router.get("/", (req, res) => {
  res.send("files API!");
});

// add routes to router

router.get("/api/files", handlers.readFolder);
router.get("/api/files/:name", handlers.readFile);
router.post("/api/files/:name", handlers.writeFile);
router.delete("/api/files/:name", handlers.deleteFile);

// export the router
module.exports = router;
