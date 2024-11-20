import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import { Modal, Form, Input, Select, message, Table } from "antd";
import axios from "axios";

const Homepage = () => {
  const [showModal, setShowModal] = useState(false);
  const [allTransactions, setAllTransactions] = useState([]);
  const [totalBalance, setTotalBalance] = useState(0);
  const [render, setRender] = useState(false);
  const getAllTransactions = async (req, res) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const res = await axios.post(
        "http://localhost:8080/api/v1/transactions/get-transaction",
        { userId: user._id }
      );
      setAllTransactions(res.data.message);
      console.log(res.data);
    } catch (error) {
      console.log(error);
      message("Fetch issue transactions");
    }
  };

  const [form] = Form.useForm();
  const handleDelete = async (record) => {
    try {
      await axios.post(
        "http://localhost:8080/api/v1/transactions/delete-transaction",
        { transactionId: record._id }
      );
      message.success("Deleted Successfully");
      setRender(!render);
    } catch (error) {
      console.log(error);
      message.error("Failed to delete.");
    }
  };
  const handleSubmit = async (values) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));

      await axios.post(
        "http://localhost:8080/api/v1/transactions/add-transaction",
        { ...values, userId: user._id }
      );
      message.success("Added Successfully");
      setShowModal(false);
      form.resetFields();
    } catch (error) {
      message.error("Failed to add.");
      setShowModal(false);
      form.resetFields();
    }
  };
  useEffect(() => {
    getAllTransactions();
  }, [showModal, render]);

  useEffect(() => {
    const calculateTransaction = () => {
      const len = allTransactions.length;
      const totalIncomeTransactions = allTransactions.filter(
        (transaction) => transaction.type === "income"
      );
      const totalExpenseTransactions = allTransactions.filter(
        (transaction) => transaction.type === "expense"
      );
      const totalIncome = totalIncomeTransactions.reduce(
        (total, transaction) => (total += transaction.amount),
        0
      );
      const totalExpense = totalExpenseTransactions.reduce(
        (total, transaction) => (total += transaction.amount),
        0
      );
      setTotalBalance(totalIncome - totalExpense);
    };
    calculateTransaction();
  }, [allTransactions]);

  const columns = [
    {
      title: "Amount",
      dataIndex: "amount",
    },
    {
      title: "Description",
      dataIndex: "description",
    },
    {
      title: "Date",
      dataIndex: "date",
    },
    {
      title: "Type",
      dataIndex: "type",
    },
    {
      title: "Delete",
      render: (text, record) => (
        <button onClick={() => handleDelete(record)} className="btn btn-danger">
          Delete
        </button>
      ),
    },
  ];

  return (
    <Layout>
      <button className="btn btn-primary" onClick={() => setShowModal(true)}>
        Add New
      </button>
      <Modal
        title="Add Transaction"
        open={showModal}
        onCancel={() => setShowModal(false)}
        footer={false}
      >
        <Form layout="vertical" onFinish={handleSubmit} form={form}>
          <Form.Item label="Amount" name="amount">
            <Input type="number" />
          </Form.Item>
          <Form.Item label="Description" name="description">
            <Input type="text" />
          </Form.Item>
          <Form.Item label="Date" name="date">
            <Input type="date" />
          </Form.Item>
          <Form.Item label="Type" name="type">
            <Select>
              <Select.Option value="income">Income</Select.Option>
              <Select.Option value="expense">Expense</Select.Option>
            </Select>
          </Form.Item>
          <button type="submit" className="btn btn-primary">
            SAVE
          </button>
        </Form>
      </Modal>
      <div className="mx-2">Net Balance = Rs. {totalBalance}</div>
      <div className="content">
        <Table columns={columns} dataSource={allTransactions} />
      </div>
    </Layout>
  );
};

export default Homepage;
