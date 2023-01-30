const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const titleCase = require("../utils/titleCase");

const LiabilitySchema = new Schema({
  user: { type: Schema.Types.ObjectId },
  name: { type: String, required: true },
  value: { type: Number, required: true },
  interest: { type: Number, required: true, default: 7 },
});

LiabilitySchema.pre("save", function (next) {
  this.name = titleCase(this.name);
  next();
});

module.exports = mongoose.model("Liability", LiabilitySchema);
