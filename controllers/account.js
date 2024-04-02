const Account = require('../models/account.js');

const accountAccess = async (req, res) => {
    const accountId = req.params.id;
    Account.find({ _id: accountId })
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({ message: err.message || 'Something went wrong accessing the account' })
        });
};

const newAccount = async (req, res) => {
    //#swagger.tags=[accounts]
    if (!req.body.firstName || !req.body.lastName || !req.body.email || !req.body.password) {
        res.status(400).send({ message: 'Must include first and last name, email and password' });
        return;
    }
    const user = new Account(req.body);
    user.save()
        .then((data) => {
            console.log(data);
            res.status(200).send(data);
        })
        .catch((err) => {
            res.status(500).send({ message: err || 'There was an issue creating the account' });
        });
};

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

const deleteAccount = async (req, res) => {
    const accountId = req.params.id;
    if (!accountId) {
        res.status(400).json('Must use a valid account id to delete.');
        return;
    }

    try {
        await Account.findByIdAndDelete(accountId);
        res.status(200).json({ message: 'Account deleted successfully.' });
    } catch (err) {
        res.status(500).json({ message: err.message || 'Something went wrong with the deletion.' });
    }
};

module.exports = {newAccount,updateAccount,deleteAccount, accountAccess};