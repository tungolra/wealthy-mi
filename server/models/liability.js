const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const titleCase = require("../utils/titleCase");

const LiabilitySchema = new Schema({
  user: { type: Schema.Types.ObjectId },
  name: { type: String, required: true },
  amount: { type: Number, required: true },
  pairedAsset: {
    type: Schema.Types.ObjectId,
    ref: "Asset",
    required: false,
  },
});

LiabilitySchema.pre("save", (next) => {
  this.name = titleCase(this.name);
  next();
});

module.exports = mongoose.model("Asset", LiabilitySchema);
