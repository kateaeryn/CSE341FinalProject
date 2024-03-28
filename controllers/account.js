const Account = require('../models/account.js');


const updateAccount = async (req, res) => {
    //#swagger.tags=[accounts]
    const username = req.params.id;
    if (!username) {
        res.status(400).json('Must use valid user id to update account.');
    }

    Account.findOneAndUpdate(req.body)
        .then((data) => {
            console.log(data);
            res.status(200).send(data);
        })
        .catch((err) => {
            res.status(500).send({ message: err.message || 'Something went wrong with the update' });
        });
};
module.exports = {updateAccount};