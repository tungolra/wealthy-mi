const Liability = require("../models/liability");
const titleCase = require("../utils/titleCase");

async function createLiability(req, res) {
  const userId = req.params.id;

  try {
    // build new Expense object
    const newLiability = new Liability(req.body);
    newLiability.user = userId;
    await newLiability.save();
    res.status(200).json(newLiability);
  } catch (error) {
    res.status(500).json(error);
  }
}

async function getAllLiabilities(req, res) {
  const userId = req.params.id;
  const allLiabilities = await Liability.find({});

  try {
    // get user's expenses
    const liabilities = [];
    allLiabilities.forEach((liability) => {
      if (liability.user.toString() === userId) {
        liabilities.push(liability);
      }
    });
    res.status(200).json(liabilities);
  } catch (error) {
    res.status(500).json(error);
  }
}
async function editLiability(req, res) {
  const liabid = req.params.id;
  const userId = req.params.userId;
  const { name, amount, pairedAsset } = req.body;
  try {
    // * add edge case for duplicates
    const liability = await Liability.findByIdAndUpdate(
      liabid,
      {
        $set: {
          name: titleCase(name),
          amount: amount,
          pairedAsset: pairedAsset,
        },
      },
      { new: true },
    );
    res.status(200).json(liability);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
}

async function deleteLiability(req, res) {
  const liabId = req.params.id;
  try {
    await Expense.findByIdAndDelete(liabId);
    res.status(200).json("Liability deleted");
  } catch (error) {
    res.status(500).json(error);
  }
}

module.exports = {
  create: createLiability,
  index: getAllLiabilities,
  delete: deleteLiability,
  edit: editLiability,
};
