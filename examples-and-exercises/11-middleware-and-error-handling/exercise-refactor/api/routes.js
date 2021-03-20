const handlers = require("./handlers");
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

router.get("/api", handlers.getRoot);
router.get("/list", handlers.getList);
router.post("/create", handlers.postItem);

// export the router
module.exports = router;
