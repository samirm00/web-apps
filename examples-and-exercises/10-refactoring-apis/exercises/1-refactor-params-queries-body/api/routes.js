const handlers = require("./handlers.js");
const express = require("express");

// create the router
const router = express.Router();

router.use((req, res, next) => {
  console.log("routes!");
  next();
});

router.get("/", (req, res) => {
  res.send("routes!");
});

// write the routes!

router.get("/", handlers.getApi);
router.post("/param/:value", handlers.postParam);
router.post("/query", handlers.postQuery);
router.post("/body", handlers.postBody);
// export the router
module.exports = router;
