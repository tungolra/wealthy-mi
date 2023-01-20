const Category = require("../models/category");

async function getCategories(req, res) {
  const userId = req.params.id;
  const categoryNames = [];
  try {
    const docs = await Category.find({ user: { $in: userId } });
    docs.forEach((doc) => categoryNames.push(doc.name));
    categoryNames.sort()
    res.status(200).json(categoryNames);
  } catch (error) {
    res.status(500).json(error);
  }
}

module.exports = {
  index: getCategories,
};
