const Inventory = require('../models/inventory.js');

const getAllInventory = (req, res, next) => {
    //#swagger.tags=[inventory]
    Inventory.find({})
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || 'There was an issue retrieving the inventory'
            })
        
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

module.exports = { updateProduct, getAllInventory };