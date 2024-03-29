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

router.post('/inventory', vInventory, invCont.newProduct);
router.put('/inventory/:id', vInventory, invCont.updateProduct);


//order routes

router.post('/orders', vOrder, ordCont.newOrder)
router.put('/orders/:id', vOrder, ordCont.updateOrder);


//review routes

router.post('/reviews', vReview, revCont.newReview);
router.put('/reviews/:id', vReview, revCont.updateReview);



//account routes

router.post('/account', vAccount, accCont.newAccount);
router.put('account/:id', vAccount, accCont.updateAccount);



module.exports = router;