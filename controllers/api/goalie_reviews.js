const Goalie = require('../../models/goalie');

module.exports = {
    create,
    delete: delete_goalie_review
};

// create a new goalie review
function create(req, res) {
    Goalie.findById(req.params.id, function(err, goalie) {
        goalie.review.push({content: req.body.content, rating: req.body.rating});
        goalie.save(function(err) {
            res.json(goalie);
        });
    });
};

//delete a goalie review
function delete_goalie_review(req, res) {
    Goalie.findOne({'review._id': req.params.id}, function(err, goalie) {
        goalie.review.id(req.params.id).remove();
        goalie.save(function(err, goalie) {
            res.json(goalie);
        });
    });
};
