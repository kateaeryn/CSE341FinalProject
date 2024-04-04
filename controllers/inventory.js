const Inventory = require('../models/inventory.js');


const getAll = async (req, res) => {
    //#swagger.tags=['Look at all our groceries. 🛒']
    
  Inventory.find({})
    .then((data) => {
      res.send(data);
    })
      .catch((err) => {
        res.status(500).send({ message: err.message || 'There was an issue getting the groceries' });
    })
    
  };
  
const getSingleProduct = async (req, res) => {
  //#swagger.tags['Look at all our groceries. 🛒]
    const productId = req.params.id;
    Inventory.find({ _id: productId })
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({ message: err.message || "Something went wrong getting the product" })
        });
};

const newProduct = async (req, res) => {
    //#swagger.tags=['Look at all our groceries. 🛒']
    if (!req.body.productName || !req.body.price || !req.body.category || !req.body.sizeOptions || !req.body.productId||!req.body.label||!req.body.productImage) {
        res.status(400).send({ message: 'Must include name, price, category, size, and product Id' });
        return;
    }
    const product = new Inventory(req.body);
    product.save()
        .then((data) => {
            console.log(data);
            res.status(200).send(data);
        })
        .catch((err) => {
            res.status(500).send({ message: err || 'There was an issue creating the item' });
        });
};

const updateProduct = async (req, res, next) => {
    //#swagger.tags=['Look at all our groceries. 🛒']
    const productId = req.params.id;
    if (!productId) {
      res.status(400).json('Must use valid product id to update item.');
    }

    const price = parseFloat(req.body.price);
    if (isNaN(price)) {
      return res.status(400).json('Price must be a valid number.');
    }

    const groceries = {
      productName: req.body.productName,
      price: price,
      label: req.body.label,
      category: req.body.category,
      sizeOptions: req.body.sizeOptions,
      productId: req.body.productId,
      productImage: req.body.productImage
    };
  
    try {
      const updatedProduct = await Inventory.findOneAndUpdate({ _id: productId }, groceries, { new: true });
      console.log(updatedProduct);
      res.status(200).send(updatedProduct);
    } catch (err) {
      res.status(500).send({ message: err.message || 'Something went wrong with the update' });
    }
  };

  const deleteProduct = async (req, res) => {
    const productId = req.params.id;
    if (!productId) {
        res.status(400).json('Must use a valid product id to delete.');
        return;
    }

    try {
        await Inventory.findByIdAndDelete(productId);
        res.status(200).json({ message: 'Product deleted successfully.' });
    } catch (err) {
        res.status(500).json({ message: err.message || 'Something went wrong with the deletion.' });
    }
};
  
module.exports = { getSingleProduct, newProduct, updateProduct, getAll, deleteProduct };