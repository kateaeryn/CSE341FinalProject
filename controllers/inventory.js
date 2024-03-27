const dataBase = require("../models");
const ObjectId = require("mongodb").ObjectId;

const getAllInventory = async (req, res) => {
  const result = await dataBase.getDatabase().db().collection("").find();
  result.toArray().then((lists) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(lists);
  });
};

const getSingleInventory = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  const result = await dataBase
    .getDatabase()
    .db()
    .collection("")
    .find({ _id: userId });
  result.toArray().then((lists) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(lists[0]);
  });
};

module.exports = { getAllInventory, getSingleInventory };
