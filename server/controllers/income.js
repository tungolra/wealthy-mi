const Income = require("../models/income");
const titleCase = require("../utils/titleCase");

async function createIncome(req, res) {
  const userId = req.params.id;

  try {
    // build new Expense object
    const newIncome = new Income(req.body);
    newIncome.user = userId;
    await newIncome.save();
    res.status(200).json(newIncome);
  } catch (error) {
    res.status(500).json(error);
  }
}

async function getAllIncomes(req, res) {
  const userId = req.params.id;
  const allIncomes = await Income.find({});

  try {
    // get user's expenses
    const incomes = [];
    allIncomes.forEach((income) => {
      if (income.user.toString() === userId) {
        incomes.push(income);
      }
    });
    res.status(200).json(incomes);
  } catch (error) {
    res.status(500).json(error);
  }
}
async function editIncome(req, res) {
  const incomeId = req.params.id;
  const userId = req.params.userId;
  const { period, amount } = req.body;
  try {
    // * add edge case for duplicates
    const income = await Income.findByIdAndUpdate(
      incomeId,
      {
        $set: {
          period: period,
          amount: amount,
        },
      },
      { new: true },
    );
    res.status(200).json(income);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
}

async function deleteIncome(req, res) {
  const incomeId = req.params.id;
  try {
    await Expense.findByIdAndDelete(incomeId);
    res.status(200).json("Income deleted");
  } catch (error) {
    res.status(500).json(error);
  }
}

module.exports = {
  create: createIncome,
  index: getAllIncomes,
  delete: deleteIncome,
  update: editIncome,
};
