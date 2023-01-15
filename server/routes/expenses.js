const express = require("express");
const router = express.Router();
const expenseCtrl = require('../controllers/expenses')

router.post("/create/:id", expenseCtrl.create)
router.get("/:id", expenseCtrl.index)
router.delete("/:id", expenseCtrl.delete)

module.exports = router;
