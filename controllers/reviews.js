const Review = require('../models/reviews.js');

const updateReview = async (req, res) => {
    //#swagger.tags=[reviews]
    const reviewId = req.params.id;
    if (!reviewId) {
        res.status(400).json('Must use valid review id to update review.');
    }
    
        Review.findOneAndUpdate(req.body)
        .then((data) => {
            console.log(data);
            res.status(200).send(data);
        })
        .catch((err) => {
            res.status(500).send({ message: err.message || 'Something went wrong with the update' });
        });
    
};

module.exports = {updateReview};