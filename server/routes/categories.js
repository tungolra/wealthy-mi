const express = require("express");
const router = express.Router();
const categoryCtrl = require("../controllers/categories");

router.get("/:id", categoryCtrl.index)
router.delete("/:id", categoryCtrl.delete)


module.exports = router;