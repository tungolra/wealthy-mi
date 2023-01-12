const Expense = require("../models/expense");
const User = require("../models/user");

async function createExpense(req, res) {
  try {
    const expense = Expense.create(req.body);
    res.status(200).json(expense);
  } catch (error) {
    res.status(500).json(error);
  }
}

async function getAllExpenses(req, res) {
  const userId = req.user._id;
  const user = User.find({ _id: userId });
  try {
    const expenses = [];
    // get all expenses
    // if req.param.<index> === index:
    user.expenses.forEach((e) => {
      let expense = Expense.findOne({ _id: e });
      expenses.push(expense);
    });
    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).json(error);
  }
}

async function deleteExpense(req, res) {}

module.exports = {
  create: createExpense,
  index: getAllExpenses,
  delete: deleteExpense,
};

// getAllExpenses Helpers
function index() {}
function postedDate() {
  // get expenses based on Expenses.posted === date
  // if req.param.<post-date> === post-date:
}
function category() {
  // get expenses based on Expenses.category(category name)
  // if req.param.<category> === category_name:
}
function vendor() {
  // get expenses based on Expenses.vendor === vendor
  // if req.param.<vendor> === vendor_name:
}
