const transactioModel = require("../models/transactionModel");

const getAllTransaction = async (req, res) => {
  try {
    const transactions = await transactioModel.find({
      userId: req.body.userId,
    });
    res.status(201).json({ success: true, message: transactions });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error });
  }
};
const addTransaction = async (req, res) => {
  try {
    const newTransaction = new transactioModel(req.body);
    await newTransaction.save();
    res.status(201).json({ success: true, message: "Transaction Created" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error });
  }
};

const deleteTransaction = async (req, res) => {
  try {
    await transactioModel.findOneAndDelete({ _id: req.body.transactionId });
    res.status(204).json({ success: true, message: "Transaction Deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error });
  }
};

module.exports = { getAllTransaction, addTransaction, deleteTransaction };
