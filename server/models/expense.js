const mongoose = require("mongoose");
const Schema = mongoose.Schema;

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
  this.vendor =
    this.vendor.trim()[0].toUpperCase() + this.vendor.slice(1).toLowerCase();
  this.category =
    this.category.trim()[0].toUpperCase() + this.category.slice(1).toLowerCase();
  next();
});

module.exports = mongoose.model("Expense", ExpenseSchema);
