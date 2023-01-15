const Expense = require("../models/expense");
const User = require("../models/user");

async function createExpense(req, res) {
  try {
    // const expense = Expense.create(req.body);
    res.status(200).json("ran");
  } catch (error) {
    res.status(500).json(error);
  }
}

async function getAllExpenses(req, res) {
  const userId = req.user._id;
  const user = User.find({ _id: userId });
  try {
    const expenses = [];
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
