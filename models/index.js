const mongoose = require('mongoose');
const config = require('../config/database.js');
mongoose.Promise = global.Promise;

const dataBase = {};
dataBase.mongoose = mongoose;
dataBase.URL = config.url;
dataBase.inventory = require('./inventory.js')(mongoose);
dataBase.orders = require('./orders.js')(mongoose);
dataBase.account = require('./account.js')(mongoose);
dataBase.reviews = require('./reviews.js')(mongoose);

module.exports = dataBase;