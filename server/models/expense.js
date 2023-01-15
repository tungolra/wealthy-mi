const mongoose = require("mongoose");
const Schema = mongoose.Schema

const CategorySchema = new Schema({
  name: {
    type: String,
    required: true,
    // unique: true,
    trim: true,
  },
});

// format category name: "caTegory" => "Category"
CategorySchema.pre("save", function (next) {
  this.name =
    this.name.trim()[0].toUpperCase() + this.name.slice(1).toLowerCase();
  next();
});

const ExpenseSchema = new Schema(
  {
    vendor: {
      type: String,
      required: true,
    },
    category: String,
    posted: { type: Date, default: Date.now },
    value: {
      type: Number,
      min: 0.01,
      required: true,
    },
    user: {type: Schema.Types.ObjectId}
    
  },
  {
    timestamps: true,
  }
);

ExpenseSchema.pre("save", function (next) {
  this.vendor =
    this.vendor.trim()[0].toUpperCase() + this.vendor.slice(1).toLowerCase();
  next();
});


module.exports = mongoose.model("Expense", ExpenseSchema);
