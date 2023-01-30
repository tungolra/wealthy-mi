const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const titleCase = require("../utils/titleCase");

const GoalSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
    },
    targetDate: {
      type: Date,
      default: () => new Date(Date.now + 7 * 24 * 60 * 1000),
    },
    name: {
      type: String,
      required: true,
    },
    value: {
      type: Number,
    },
  },
);

GoalSchema.pre("save", function (next) {
  this.name = titleCase(this.name);
  next();
});

module.exports = mongoose.model("Goal", GoalSchema);
