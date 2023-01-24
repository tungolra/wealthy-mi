const Goal = require("../models/goal");
const titleCase = require("../utils/titleCase");

async function createGoal(req, res) {
  const userId = req.params.id;

  try {
    // build new Expense object
    const newGoal = new Goal(req.body);
    newGoal.user = userId;
    await newGoal.save();
    res.status(200).json(newGoal);
  } catch (error) {
    res.status(500).json(error);
  }
}

async function getAllGoals(req, res) {
  console.log("this is goal");
  const userId = req.params.id;
  const allGoals = await Goal.find({});

  try {
    // get user's expenses
    const goals = [];
    allGoals.forEach((goal) => {
      if (goal.user.toString() === userId) {
        goals.push(goal);
      }
    });
    res.status(200).json(goals);
  } catch (error) {
    res.status(500).json(error);
  }
}
async function editGoal(req, res) {
  const goalId = req.params.goalId;
  const userId = req.params.userId;
  const { name, amount, pairedLiability } = req.body;
  try {
    // * add edge case for duplicates
    const asset = await Goal.findByIdAndUpdate(
      goalId,
      {
        $set: {
          name: titleCase(name),
          amount: amount,
          pairedLiability: pairedLiability,
        },
      },
      { new: true },
    );
    res.status(200).json(asset);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
}

async function deleteGoal(req, res) {
  const goalId = req.params.id;
  try {
    await Goal.findByIdAndDelete(goalId);
    res.status(200).json("Goal deleted");
  } catch (error) {
    res.status(500).json(error);
  }
}

module.exports = {
  create: createGoal,
  index: getAllGoals,
  delete: deleteGoal,
  edit: editGoal,
};
