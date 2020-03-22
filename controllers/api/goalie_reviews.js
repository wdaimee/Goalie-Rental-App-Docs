const Goalie = require('../../models/goalie');

module.exports = {
    create,
    update,
    delete: delete_goalie_review
};

// create a new goalie review
function create(req, res) {
    Goalie.findById(req.params.id, function(err, goalie) {
        goalie.goalie_review.push(req.boy);
        goalie.save(function(err) {
            res.json(goalie);
        });
    });
};

//update a goalie review
function update(req, res) {
    Goalie.review.findOneAndUpdate(req.params.id, req.body, {new: true}, function(err, goalie) {
        res.json(goalie);
    }); 
};

//delete a goalie review
function delete_goalie_review(req, res) {
    Game.review.findOneAndDelete(req.params.id , function(err, goalie) {
        res.json(goalie);
    });
};
