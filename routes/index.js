const router = require('express').Router();
const invCont = require('../controllers/inventory');
const ordCont = require('../controllers/order');
const revCont = require('../controllers/reviews');
const accCont = require('../controllers/account');
const index = require('../controllers/index');
const { vAccount, vOrder, vReview, vInventory } = require('../middleware/validate');
const { isAuthenticated } = require('../middleware/authenticate');
const passport = require('passport');



  
router.use('/', require('./swagger'));

router.get('/', index);

//login route
router.get('/login', passport.authenticate('github'), (req, res) => { });

//logout route
router.get('/logout', function (req, res, next) {
  req.logOut(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect('/');
  });
});




//inventory routes
router.get('/inventory', invCont.getAll); 
router.get('/inventory/:id', invCont.getSingleProduct);
router.post('/inventory', isAuthenticated, vInventory, invCont.newProduct);
router.put('/inventory/:id', isAuthenticated, vInventory, invCont.updateProduct);
router.delete('/inventory/:id', isAuthenticated, invCont.deleteProduct);


//order routes
router.get('/orders', isAuthenticated, ordCont.getOrders);
router.get('/orders/:id',  ordCont.getOrderById);
router.post('/orders', isAuthenticated, vOrder, ordCont.newOrder)
router.put('/orders/:id', isAuthenticated, vOrder, ordCont.updateOrder);
router.delete('/orders/:id', isAuthenticated, ordCont.deleteOrder);


//review routes
router.get('/reviews/:id',  revCont.getReviewById);
router.post('/reviews', isAuthenticated, vReview, revCont.newReview);
router.put('/reviews/:id', isAuthenticated, vReview, revCont.updateReview);
router.delete('/reviews/:id', isAuthenticated, revCont.deleteReview);



//account routes
router.get('/account/:id', isAuthenticated, accCont.accountAccess);
router.post('/account', isAuthenticated, vAccount, accCont.newAccount);
router.put('/account/:id', isAuthenticated, vAccount, accCont.updateAccount);
router.delete('/account/:id', isAuthenticated, accCont.deleteAccount);




module.exports = router;