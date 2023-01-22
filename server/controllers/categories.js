const Category = require("../models/category");
const Expense = require("../models/expense");

async function getCategories(req, res) {
  const userId = req.params.id;
  const categoryNames = [];
  try {
    const docs = await Category.find({ user: { $in: userId } });
    docs.forEach((doc) => categoryNames.push(doc.name));
    categoryNames.sort();
    res.status(200).json(categoryNames);
  } catch (error) {
    res.status(500).json(error);
  }
}
async function deleteCategory(req, res) {
  const userId = req.params.id;
  const { category } = req.body;

  try {
    // delete category from Category model
    const deleteCategory = await Category.deleteOne(
      { user: userId, name: category }
    ); 

    // delete category from related expenses
    Expense.updateMany({category: category}, {category: ""}, (err, doc) => {
      if (err) { 
      console.log(err)
      } else { console.log(doc)}
    })

    res.status(200).json(`${deleteCategory} deleted and removed from Expenses`);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
}

module.exports = {
  index: getCategories,
  delete: deleteCategory,
};
