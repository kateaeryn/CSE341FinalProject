const express = require("express");
const router = express.Router();

const inventoryController = require("../controllers/inventory");

router.get("/", inventoryController.getAllInventory);

router.get("/:id", inventoryController.getSingleInventory);

module.exports = router;
