const router = require("express").Router();
const {
  addTransaction,
  getAllTransaction,
  deleteTransaction,
} = require("../controllers/transactionController");

//routes
router.post("/add-transaction", addTransaction);
router.post("/get-transaction", getAllTransaction);
router.post("/delete-transaction", deleteTransaction);

module.exports = router;
