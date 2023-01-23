const express = require("express");
const router = express.Router();
const incomeCtrl = require("../controllers/income");

router.post("/create/:id", incomeCtrl.create);
router.put("/:userId/:id", incomeCtrl.edit);
router.get("/:id", incomeCtrl.index);
router.delete("/:id", incomeCtrl.delete);

module.exports = router;
