const Expense = require("../models/expense");
const Category = require("../models/category");

async function createExpense(req, res) {
  const { category } = req.body;
  const userId = req.params.id;
  try {
    // check if category exists
    categoryExists(category, userId);
    // build new Expense object
    const newExpense = new Expense(req.body);
    newExpense.user = userId;
    await newExpense.save();
    res.status(200).json(newExpense);
  } catch (error) {
    res.status(500).json(error);
  }
}

async function getAllExpenses(req, res) {
  const userId = req.params.id;
  const allExpenses = await Expense.find({});

  try {
    const expenses = [];
    allExpenses.forEach((expense) => {
      if (expense.user.toString() === userId) {
        expenses.push(expense);
      }
    });
    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).json(error);
  }
}
async function editExpense(req, res) {
  const expenseId = req.params.expenseId;
  const userId = req.params.userId;
  const { category } = req.body;

  try {
    categoryExists(category, userId);
    const expense = await Expense.findByIdAndUpdate(
      expenseId,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(expense);
  } catch (error) {
    res.status(500).json(error);
  }
}

async function deleteExpense(req, res) {
  const expenseId = req.params.id;
  try {
    await Expense.findByIdAndDelete(expenseId);
    res.status(200).json("Expense deleted");
  } catch (error) {
    res.status(500).json(error);
  }
}

module.exports = {
  create: createExpense,
  index: getAllExpenses,
  delete: deleteExpense,
  update: editExpense,
};

// helper functions
async function categoryExists(str, id) {
  const categoryExists = await Category.findOne({ name: str, user: id });
  if (categoryExists) {
    return;
  } else {
    const newCategory = new Category({ name: str });
    newCategory.user = id;
    newCategory.save();
  }
}
