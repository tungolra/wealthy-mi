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
    console.log(error);
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
  const assetId = req.params.assetId;
  const userId = req.params.userId;
  const { name, value } = req.body;
  console.log(req.body, assetId);
  console.log(req.params);
  try {
    // * add edge case for duplicates
    const asset = await Asset.findByIdAndUpdate(
      assetId,
      {
        $set: {
          name: titleCase(name),
          value: value,
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
    await Asset.findByIdAndDelete(assetId);
    res.status(200).json("Asset deleted");
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
}

module.exports = {
  create: createAsset,
  index: getAllAssets,
  delete: deleteAsset,
  edit: editAsset,
};
