const express = require("express");
const router = express.Router();
const assetCtrl = require("../controllers/asset");

router.post("/create/:id", assetCtrl.create);
router.put("/:userId/:assetId", assetCtrl.edit);
router.get("/:id", assetCtrl.index);
router.delete("/:id", assetCtrl.delete);

module.exports = router;
