const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const GoalSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    targetDate: {
      type: Date,
      default: () => new Date(Date.now + 7 * 24 * 60 * 1000),
    },
    name: {
      name: String,
      required: true,
    },
  },
);
