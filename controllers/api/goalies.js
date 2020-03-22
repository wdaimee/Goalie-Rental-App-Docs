const Goalie = require('../../models/goalie');

module.exports = {
    index,
    show,
    create,
    update,
    delete: delete_goalie
};

//send all goalies as json response
function index(req, res) {
    Goalie.find({})
    .populate('requestor')
    .exec((err, goalies) => {
        if (err) {
            console.log("index error: " + err);
            res.sendStatus(500);
        }
        res.json(goalies);
    });
};

//get one goalie
function show(req, res) {
    Goalie.findById(req.params.id)
    .populate('requestor')
    .exec((err, goalie) => {
        if (err) {
            console.log('error: ' + err);
            res.sendStatus(500);
        }
        res.json(goalie);
    });
};

// create a new goalie
function create(req, res) {
    const new_goalie = new Goalie({
        name: req.body.name,
        sport: req.body.sport,
        skill_level: req.body.skill_level,
        contact_info: req.body.contact_info
    });
    new_goalie.save((err, goalie) => {
        if (err) {
            console.log("create error: " + err)
        }
        console.log("created goalie");
        res.json(goalie);
    });
};

//update a goalie
function update(req, res) {
    Goalie.findOneAndUpdate(req.params.id, req.body, {new: true})
    .populate('requestor')
    .exec((err, goalie) => {
        if (err) {
            console.log("error: " + err);
            res.sendStatus(500);
        }
        res.json(goalie);
    });
};

//delete a goalie
function delete_Goalie(req, res) {
    Game.findOneAndDelete(req.params.id)
    .populate('requestor')
    .exec((err, goalie) => {
        if (err) {
            console.log("error: " + err);
            res.sendStatus(500);
        }
        res.json(goalie)
    });
};


