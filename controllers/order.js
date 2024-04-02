const Order = require('../models/orders.js');


const newOrder = async (req, res) => {
     //#swagger.tags=[Your orders]
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
    //#swagger.tags=[Your orders]
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

const deleteOrder = async (req, res) => {
    const orderId = req.params.id;
    if (!orderId) {
        res.status(400).json('Must use a valid order id to delete.');
        return;
    }

    try {
        await Order.findByIdAndDelete(orderId);
        res.status(200).json({ message: 'Order deleted successfully.' });
    } catch (err) {
        res.status(500).json({ message: err.message || 'Something went wrong with the deletion.' });
    }
};

module.exports = {newOrder, updateOrder, deleteOrder};