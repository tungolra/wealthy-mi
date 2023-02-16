const Goal = require("../models/goal");
const titleCase = require("../utils/titleCase");

async function createGoal(req, res) {
  const userId = req.params.id;
  console.log(req.body);
  try {
    // build new Expense object
    const newGoal = new Goal(req.body);
    newGoal.user = userId;
    await newGoal.save();
    res.status(200).json(newGoal);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
}

async function getAllGoals(req, res) {
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
  const { name, value, targetDate } = req.body;
  try {
    // * add edge case for duplicates
    const goal = await Goal.findByIdAndUpdate(
      goalId,
      {
        $set: {
          name: titleCase(name),
          value: value,
          targetDate: targetDate,
        },
      },
      { new: true },
    );
    res.status(200).json(goal);
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
