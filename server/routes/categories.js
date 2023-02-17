const express = require("express");
const router = express.Router();
const categoryCtrl = require("../controllers/categories");

router.post("/:id", categoryCtrl.create)
router.put("/:id", categoryCtrl.edit)
router.get("/:id", categoryCtrl.index)
router.delete("/:id", categoryCtrl.delete)


module.exports = router;