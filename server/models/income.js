const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const titleCase = require("../utils/titleCase");

const IncomeSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId },
    name: { type: String, required: true },
    value: {
      type: Number,
      required: true,
    },
  },
);

IncomeSchema.pre("save", function (next) {
  this.name = titleCase(this.name);
  next();
});
module.exports = mongoose.model("Income", IncomeSchema);
