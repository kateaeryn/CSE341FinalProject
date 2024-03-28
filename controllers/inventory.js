const dataBase = require("../models");
const Inventoryschema = dataBase.inventory;

const getAllInventory = (req, res) => {
  console.log(req.headers);
  if (req.headers['key']) {
    Inventoryschema.find(
      {},
      {
        productName: 1,
        price: 1,
        label: 1,
        category: 1,
        sizeOptions: 1,
        SKU: 1,
        productImage: 1,
      }
    )
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving product name.",
        });
      });
  } else {
    res.send("Invalid");
  }
};

const getSingleInventory = (req, res) => {
  const inventory_name = req.params.productName;
  if (req.headers ['key']) {
    Inventoryschema.find({ inventory_name: inventory_name })
      .then((data) => {
        if (!data || data.length === 0)
          res
            .status(404)
            .send({ message: "Not Product Name found" + inventory_name });
        else res.send(data[0]);
      })
      .catch((err) => {
        res.status(500).send({
          message: "Error retrieving Product Name" + inventory_name,
        });
      });
  } else {
    res.send("Invalid Product Name");
  }
};

module.exports = { getAllInventory, getSingleInventory };
