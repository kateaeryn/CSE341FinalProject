const router = require('express').Router();
// const userCont = require('../controllers/users');
// const bookCont = require('../controllers/books');
// const { saveUser, saveBook } = require('../middleware/validate');
// const { isAuthenticated } = require('../middleware/authenticate');
// const passport = require('passport');

router.use('/', require('./swagger'));

router.get('/', (req, res) => { res.send('Welcome to the little BIG Store') });

//inventory routes



//order routes



//review routes




//account routes




module.exports = router;