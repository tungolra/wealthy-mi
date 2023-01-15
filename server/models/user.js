const mongoose = require("mongoose");
const Schema = mongoose.Schema


const UserSchema = new Schema(
    {
      username: {
        type: String,
        required: true,
      },
      password: {
        type: String,
        required: true,
      },
      firstname: {
        type: String,
        required: true,
      },
      lastname: {
        type: String,
        required: true,
      },
      // expenses: [{type: Schema.Types.ObjectId}]
    },
    {
      timestamps: true,
    }
  );

module.exports = mongoose.model("User", UserSchema);