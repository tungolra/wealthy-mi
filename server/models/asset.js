const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const titleCase = require("../utils/titleCase");

const AssetSchema = new Schema({
  user: { type: Schema.Types.ObjectId, required: true },
  name: { type: String, required: true },
  amount: { type: Number, required: true },
  pairedLiability: {
    type: Schema.Types.ObjectId,
    ref: "Liability",
    required: false,
  },
});

AssetSchema.pre("save", (next) => {
  this.name = titleCase(this.name);
});

module.exports = mongoose.model("Asset", AssetSchema);
