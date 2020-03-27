const Review = require('../../models/Review');

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

// create a new user review
function create(req, res) {
    const new_review = new Review({
        content: req.body.content,
        rating: req.body.rating,
        review_by: req.user,
        user_reviewed: req.params.id
    }); 
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
    Review.findById(req.params.id, function(err, review) {
        if (err) {
            console.log("error: " + err);
            res.sendStatus(500);
        }
        if (req.user.id != review.review_by._id) {
            return res.json({response: 'You are not authorized to delete this review'});
        }
        Review.findByIdAndDelete(review)
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
    });
};
