const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const titleCase = require("../utils/titleCase");

const CategorySchema = new Schema({
  name: String,
  user: { type: Schema.Types.ObjectId },
});

CategorySchema.pre("save", function (next) {
  this.name = titleCase(this.name);
  next();
});

module.exports = mongoose.model("Category", CategorySchema);
