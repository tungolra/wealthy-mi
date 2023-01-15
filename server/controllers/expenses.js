const Expense = require("../models/expense");

async function createExpense(req, res) {
  try {
    const newExpense = new Expense(req.body)
    newExpense.user = req.params.id
    console.log(newExpense)
    await newExpense.save()
    res.status(200).json(newExpense);
  } catch (error) {
    res.status(500).json(error);
  }
}

async function getAllExpenses(req, res) {
  const userId = req.params.id
  const allExpenses = await Expense.find({})
  
  try {
    const expenses = [];
    allExpenses.forEach((expense) => {
      if (expense.user.toString() === userId){
        expenses.push(expense)
      }
    });
    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).json(error);
  }
}

async function deleteExpense(req, res) {
  const expenseId = req.params.id
  try {
    await Expense.findByIdAndDelete(expenseId)
    res.status(200).json("Expense deleted")
  } catch (error) {
    res.status(500).json(error)
  }
}

module.exports = {
  create: createExpense,
  index: getAllExpenses,
  delete: deleteExpense,
};
