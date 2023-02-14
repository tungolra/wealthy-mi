const mongoose = require("mongoose");
mongoose.set("strictQuery", false); // per DeprecationWarning, set strictQuery to false

mongoose.connect(
  process.env.DATABASE_URL,
  // process.env.MONGO_DB,
);

const db = mongoose.connection;

db.on("connected", function () {
  console.log(`Connected to ${db.name} at ${db.host}:${db.port}`);
});
