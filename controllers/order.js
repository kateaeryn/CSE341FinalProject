const Order = require('../models/orders.js');


const newOrder = async (req, res) => {
    //#swagger.tags=[orders]
    if (!req.body.userName || !req.body.items || !req.body.orderTotal) {
        res.status(400).send({ message: 'Must include username, items and total' });
        return;
    }
    const order = new Order(req.body);
    order.save()
        .then((data) => {
            console.log(data);
            res.status(200).send(data);
        })
        .catch((err) => {
            res.status(500).send({ message: err || 'There was an issue creating the order' });
        });
};


const updateOrder = async (req, res) => {
    //#swagger.tags=[orders]
    const orderId = req.params.id;
    if (!orderId) {
        res.status(400).json('Must use valid order id to update order.');
    }
        Order.findOneAndUpdate(req.body)
        .then((data) => {
            console.log(data);
            res.status(200).send(data);
        })
        .catch((err) => {
            res.status(500).send({ message: err.message || 'Something went wrong with the update' });
        });
    
};

module.exports = {newOrder, updateOrder};