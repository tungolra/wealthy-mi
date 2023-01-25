const express = require("express");
const router = express.Router();
const liabilityCtrl = require("../controllers/liability");

router.use((req, resp, next) => {
  console.log("Hitting liability router");
  next();
});

router.post("/create/:id", liabilityCtrl.create);
router.put("/:userId/:id", liabilityCtrl.edit);
router.get("/:id", liabilityCtrl.index);
router.delete("/:id", liabilityCtrl.delete);

module.exports = router;
