const Review = require('../models/reviews.js');

const getReviewById = async (req, res) => {
    //#swagger.tags[reviews]
    const reviewId = req.params.id;
    Review.find({ _id: reviewId })
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({ message: err.message || "Something went wrong getting the reviews" })
        });
};

const newReview = async (req, res) => {
    //#swagger.tags=[reviews]
    if (!req.body.userName || !req.body.productName || !req.body.productId || !req.body.reviewText) {
        res.status(400).send({ message: 'All fields are required.' });
        return;
    }
    const review = new Review(req.body);
    review.save()
        .then((data) => {
            console.log(data);
            res.status(200).send(data);
        })
        .catch((err) => {
            res.status(500).send({ message: err || 'There was an issue creating the review' });
        });
};

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

const deleteReview = async (req, res) => {
    const reviewId = req.params.id;
    if (!reviewId) {
        res.status(400).json('Must use a valid review id to delete.');
        return;
    }

    try {
        await Review.findByIdAndDelete(reviewId);
        res.status(200).json({ message: 'Review deleted successfully.' });
    } catch (err) {
        res.status(500).json({ message: err.message || 'Something went wrong with the deletion.' });
    }
};

module.exports = {newReview, updateReview, deleteReview, getReviewById};