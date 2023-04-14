const mongoose = require("mongoose");

const connectDb = async () => {
  await mongoose.connect(process.env.MONGO_URL);
  console.log("Database connect successfully.");
};

module.exports = connectDb;
