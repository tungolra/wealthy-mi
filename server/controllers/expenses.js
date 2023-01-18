const Expense = require("../models/expense");
const Category = require("../models/category");

async function createExpense(req, res) {
  const { category } = req.body;
  try {
    // build new Expense object
    const newExpense = new Expense(req.body);
    newExpense.user = req.params.id;

    // check if category exists
    const categoryExists = await Category.findOne({ name: category });
    if (categoryExists) {
      // only add ID of new expense to category.expenses array
      categoryExists.expenses.push(newExpense._id);
    } else {
      // create new category and add expense ID to array
      const newCategory = new Category({ name: category });
      newCategory.expenses.push(newExpense._id);
      newCategory.save()
    }
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
};
