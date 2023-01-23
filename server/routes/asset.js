const express = require("express");
const router = express.Router();
const assetCtrl = require("../controllers/categories");

router.post("/:id", assetCtrl.create);
router.put("/:id", assetCtrl.edit);
router.get("/:id", assetCtrl.index);
router.delete("/:id", assetCtrl.delete);

module.exports = router;
