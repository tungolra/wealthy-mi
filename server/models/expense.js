const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const titleCase = require("../utils/titleCase");

const ExpenseSchema = new Schema(
  {
    vendor: {
      type: String,
      required: true,
    },
    posted: { type: Date, default: Date.now },
    value: {
      type: Number,
      min: 0.01,
      required: true,
    },
    user: { type: Schema.Types.ObjectId },
    category: { type: String },
  },
  {
    timestamps: true,
  }
);

ExpenseSchema.pre("save", function (next) {
  this.vendor = titleCase(this.vendor);
  this.category = titleCase(this.category);
  next();
});

module.exports = mongoose.model("Expense", ExpenseSchema);
