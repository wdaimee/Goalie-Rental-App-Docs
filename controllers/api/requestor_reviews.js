const Requestor = require('../../models/Requestor');

module.exports = {
    create,
    delete: delete_requestor_review
};

// create a new review for a requestor
function create(req, res) {
    Requestor.findById(req.params.id, function(err, requestor) {
        requestor.review.push({content: req.body.content, rating: req.body.rating});
        requestor.save(function(err) {
            res.json(requestor);
        });
    });
};

//delete a review for a requestor
function delete_requestor_review(req, res) {
    Requestor.findOne({'review._id': req.params.id}, function(err, requestor) {
        requestor.review.id(req.params.id).remove();
        requestor.save(function(err, requestor) {
            res.json(requestor);
        });
    });
};
