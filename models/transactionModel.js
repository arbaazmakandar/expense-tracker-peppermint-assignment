const mongoose = require("mongoose");

//schema design
const transactionSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
    },
    amount: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

//export
const transactionModel = mongoose.model("transactions", transactionSchema);
module.exports = transactionModel;
