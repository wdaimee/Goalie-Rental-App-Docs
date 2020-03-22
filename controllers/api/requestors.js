const Requestor = require('../../models/requestor');

module.exports = {
    index,
    show,
    create,
    update,
    delete: deleteRequestor
};

//send all requestors as json response
function index(req, res) {
    Requestor.find({})
    .populate('goalie')
    .exec((err, requestors) => {
        if (err) {
            console.log("index error: " + err);
            res.sendStatus(500);
        }
        res.json(requestors);
    });
};

//get one requestor
function show(req, res) {
    Requestor.findById(req.params.id)
    .populate('goalie')
    .exec((err, requestor) => {
        if (err) {
            console.log('error: ' + err);
            res.sendStatus(500);
        }
        res.json(requestor);
    });
};

// create a new requestor
function create(req, res) {
    const new_requestor = new Requestor({
        name: req.body.name,
        age: req.body.age,
        contact_info: req.body.contact_info
    });
    new_requestor.save((err, requestor) => {
        if (err) {
            console.log("create error: " + err)
        }
        console.log("created requestor");
        res.json(requestor);
    });
};

//update a requestor
function update(req, res) {
    Requestor.findOneAndUpdate(req.params.id, req.body, {new: true})
    .populate('goalie')
    .exec((err, requestor) => {
        if (err) {
            console.log("error: " + err);
            res.sendStatus(500);
        }
        res.json(requestor);
    });
};

//delete a requestor
function deleteRequestor(req, res) {
    Requestor.findOneAndDelete(req.params.id)
    .populate('goalie')
    .exec((err, requestor) => {
        if (err) {
            console.log("error: " + err);
            res.sendStatus(500);
        }
        res.json(requestor)
    });
};


