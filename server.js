
/**************************
 * Require Statements
 *************************/
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;
const dataBase = require('./models');
//const session = require('express-session');


/**************************
 * Middleware
 **************************/
app.use(bodyParser.json())
    .use('/', require('./routes'));

/****************************
 * Error handling
 ****************************/
app.use((err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";
    res.status(err.statusCode).json({ message: err.message });
})

/**************************
 * Verify database operation
 **************************/
dataBase.mongoose.connect(
    process.env.MONGODB_URI)
    .then(() => {
        app.listen(port, () => {
            console.log(`Connected to database on port: ${port}`);
        });
    })
    .catch((err) => {
        console.error('Cannot connect to the database', err);
        process.exit();
    });








