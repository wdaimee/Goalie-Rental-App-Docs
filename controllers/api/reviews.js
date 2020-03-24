const Review = require('../../models/Review');
const User = require('../../models/User');


module.exports = {
    index,
    all_reviews,
    create,
    delete: delete_review
};

//get all reviews for user
function index(req, res) {
   Review.find({}).populate({
       path: 'user_reviewed',
       match: {_id:req.params.id}
   })
   .populate('review_by')
   .exec((err, reviews) => {
       if (err) {
           console.log("error: " + err);
           res.sendStatus(500);
       }
       res.json(reviews);
   });
};

//get all reviews (need to complete)
function all_reviews(req, res) {
    Review.find({}, function(err, reviews) {
        if (err) {
            console.log("error: " + err);
            res.sendStatus(500);
        }
        res.json(reviews);
    });
};

// create a new user review
function create(req, res) {
    const new_review = new Review({
        content: req.body.content,
        rating: req.body.rating
    }); 
    new_review.review_by = req.body.review_by;
    new_review.user_reviewed = req.body.user_reviewed;
    new_review.save((err, review) => {
        Review.findOne(review)
        .populate('review_by') 
        .populate('user_reviewed')
        .exec((err, review) => {
            if (err) {
                console.log("error: " + err);
                res.sendStatus(500);
            }
            res.json(review);
        });
    });
};

//delete a user review
function delete_review(req, res) {
    Review.findOneAndDelete(req.params.id)
    .populate('review_by')
    .populate('user_reviewed')
    .exec((err, review) => {
        console.log(review);
        if (err) {
            console.log("error: " + err);
            res.sendStatus(500);
        }
        res.json(review)
    });
};