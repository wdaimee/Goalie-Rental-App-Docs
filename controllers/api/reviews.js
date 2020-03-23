const Review = require('../../models/Review');
const User = require('../../models/User');


module.exports = {
    index,
    create,
    delete: delete_review
};

//get all reviews for user
function index(req, res) {
   Review.find({}).populate({
       path: 'user_reviewed',
       match: {_id:req.params.id}
   }).exec((err, reviews) => {
       if (err) {
           console.log(err);
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
    User.findOne({_id: req.body.review_by}, (err, user) => {
        console.log(user);
        new_review.review_by = user;
    });
    User.findOne({_id: req.body.user_reviewed}, (err, user) => {
        console.log(user);
        new_review.user_reviewed = user;
    });
    new_review.save((err, review) => {
        res.json(review);
        Review.findOne(review).populate('review_by', 'user_reviewed')
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
    Review.findOneAndDelete(req.params.id).populdate('review_by', 'user_reviewed')
    .exec((err, review) => {
        if (err) {
            console.log("error: " + err);
            res.sendStatus(500);
        }
        res.json(review)
    });
};