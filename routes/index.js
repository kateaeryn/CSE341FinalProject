const router = require('express').Router();
const invCont = require('../controllers/inventory');
const ordCont = require('../controllers/order');
const revCont = require('../controllers/reviews');
const accCont = require('../controllers/account');
const { vAccount, vOrder, vReview, vInventory } = require('../middleware/validate');
const { isAuthenticated } = require('../middleware/authenticate');


router.use('/', require('./swagger'));

router.get('/', (req, res) => { res.send('Welcome to the little BIG Store') });

//inventory routes
router.get('/inventory', invCont.getAllInventory);

router.put('/inventory/:id', vInventory, invCont.updateProduct);


//order routes
router.put('/orders/:id', vOrder, isAuthenticated, ordCont.updateOrder);


//review routes
router.put('/reviews/:id', vReview, isAuthenticated, revCont.updateReview);



//account routes
router.put('account/:id', vAccount, isAuthenticated, accCont.updateAccount);



module.exports = router;