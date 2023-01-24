const express = require("express");
const router = express.Router();
const goalCtrl = require("../controllers/categories");

router.use((req, res, next) => {
  console.log("returning goals");
  console.log(req.params);
});
router.post("/create/:id", goalCtrl.create);
router.put("/:userId/:goalId", goalCtrl.edit);
router.get("/:id", goalCtrl.index);
router.delete("/:id", goalCtrl.delete);

module.exports = router;
