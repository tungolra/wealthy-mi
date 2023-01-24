const express = require("express");
const router = express.Router();
const liabilityCtrl = require("../controllers/categories");

router.use((req, res, next) => {
  console.log(req.params);
});
router.post("/create/:id", liabilityCtrl.create);
router.put("/:userId/:id", liabilityCtrl.edit);
router.get("/:id", liabilityCtrl.index);
router.delete("/:id", liabilityCtrl.delete);

module.exports = router;
