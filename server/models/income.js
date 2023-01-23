const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const IncomeSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId },
    period: {
      type: Number,
      required: true,
    },

    amount: { type: Number, required: true },
  },
);

module.exports = mongoose.model("Income", IncomeSchema);
