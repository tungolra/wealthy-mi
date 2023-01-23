const express = require("express");
const router = express.Router();
const goalCtrl = require("../controllers/categories");

router.post("/create/:id", goalCtrl.create);
router.put("/:userId/:goalId", goalCtrl.edit);
router.get("/:id", goalCtrl.index);
router.delete("/:id", goalCtrl.delete);

module.exports = router;
