const Inventory = require('../models/inventory.js');

const newProduct = async (req, res) => {
    //#swagger.tags=[inventory]
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
    //#swaggers.tags=[inventory]
    const productId = req.params.id;
    if (!productId) {
        res.status(400).json('Must use valid product id to update item.');
    }

    Inventory.findOneAndUpdate(req.body)
        .then((data) => {
            console.log(data);
            res.status(200).send(data);
        })
        .catch((err) => {
            res.status(500).send({ message: err.message || 'Something went wrong with the update' });
        });
};

module.exports = { newProduct, updateProduct };