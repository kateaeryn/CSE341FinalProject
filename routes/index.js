const router = require('express').Router();
const invCont = require('../controllers/inventory');
const ordCont = require('../controllers/order');
const revCont = require('../controllers/reviews');
const accCont = require('../controllers/account');
const { vAccount, vOrder, vReview, vInventory } = require('../middleware/validate');
const { isAuthenticated } = require('../middleware/authenticate');
const passport = require('passport');

//login route
router.get('/login', passport.authenticate('github'), (req, res) => {});

//logout route
router.get('/logout', function (req, res, next) {
  req.logOut(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect('/');
  });
});


router.use('/', require('./swagger'));

router.get('/', (req, res) => { res.send('Welcome to the little BIG Store') });

//inventory routes
// router.get('/inventory', invCont.getAll); 
router.post('/inventory', isAuthenticated, vInventory, invCont.newProduct);
router.put('/inventory/:id', isAuthenticated, vInventory, invCont.updateProduct);


//order routes
router.get('/orders', ordCont.newOrder)
router.post('/orders', isAuthenticated, vOrder, ordCont.newOrder)
router.put('/orders/:id', isAuthenticated, vOrder, ordCont.updateOrder);


//review routes

router.post('/reviews', isAuthenticated, vReview, revCont.newReview);
router.put('/reviews/:id', isAuthenticated, vReview, revCont.updateReview);



//account routes

router.post('/account', isAuthenticated, vAccount, accCont.newAccount);
router.put('account/:id', isAuthenticated, vAccount, accCont.updateAccount);



module.exports = router;