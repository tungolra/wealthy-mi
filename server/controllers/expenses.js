const Expense = require("../models/expense");
const Category = require("../models/category");
const titleCase = require("../utils/titleCase");
const categoryExists = require("../utils/categoryExists")

async function createExpense(req, res) {
  const { category } = req.body;
  const userId = req.params.id;
  try {
    // check if category exists
    categoryExists(titleCase(category), userId, Category);
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
    // get user's expenses
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
  const { category, vendor, posted, value } = req.body;
  try {
    // * add edge case for duplicates
    categoryExists(titleCase(category), userId, Category);
    const expense = await Expense.findByIdAndUpdate(
      expenseId,
      {
        $set: {
          category: titleCase(category),
          vendor: titleCase(vendor),
          posted: posted,
          value: value,
        },
      },
      { new: true }
    );
    res.status(200).json(expense);
  } catch (error) {
    console.log(error);
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

