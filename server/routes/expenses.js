const express = require("express");
const router = express.Router();
const expenseCtrl = require('../controllers/expense')

router.post("/create", expenseCtrl.create)
router.get("/", expenseCtrl.index)
router.delete("/:id", expenseCtrl.delete)

module.exports = router;
