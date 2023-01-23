const Asset = require("../models/asset");
const titleCase = require("../utils/titleCase");

async function createAsset(req, res) {
  const userId = req.params.id;

  try {
    // build new Expense object
    const newAsset = new Asset(req.body);
    newAsset.user = userId;
    await newAsset.save();
    res.status(200).json(newAsset);
  } catch (error) {
    res.status(500).json(error);
  }
}

async function getAllAssets(req, res) {
  const userId = req.params.id;
  const allAssets = await Asset.find({});

  try {
    // get user's expenses
    const assets = [];
    allAssets.forEach((asset) => {
      if (asset.user.toString() === userId) {
        assets.push(asset);
      }
    });
    res.status(200).json(assets);
  } catch (error) {
    res.status(500).json(error);
  }
}
async function editAsset(req, res) {
  const assetId = req.params.id;
  const userId = req.params.userId;
  const { name, amount, pairedLiability } = req.body;
  try {
    // * add edge case for duplicates
    const asset = await Asset.findByIdAndUpdate(
      assetId,
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

async function deleteAsset(req, res) {
  const assetId = req.params.id;
  try {
    await Expense.findByIdAndDelete(assetId);
    res.status(200).json("Asset deleted");
  } catch (error) {
    res.status(500).json(error);
  }
}

module.exports = {
  create: createAsset,
  index: getAllAssets,
  delete: deleteAsset,
  update: editAsset,
};
