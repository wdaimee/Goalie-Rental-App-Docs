const Requestor = require('../../models/Requestor');

module.exports = {
    create,
    delete: delete_requestor_review
};

// create a new requestor review
function create(req, res) {
    Requestor.findById(req.params.id, function(err, requestor) {
        requestor.review.push(req.boy);
        requestor.save(function(err) {
            res.json(requstor);
        });
    });
};

//delete a goalie review
function delete_requestor_review(req, res) {
    Requestor.review.findOneAndDelete(req.params.id , function(err, requestor) {
        res.json(requstor);
    });
};
