const Goalie = require('../../models/goalie');
const Requestor = require('../../models/requestor');

module.exports = {
    index,
    show,
    create,
    update,
    delete: deleteGoalie
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
        sport: req.body.sport,
        city: req.body.city,
        arena: req.body.area,
        request_date: req.body.request_date,
        team_name: req.body.team_name,
        description: req.body.description
    });
    new_game.save((err, game) => {
        if (err) {
            console.log("create error: " + err)
        }
        console.log("created game");
        res.json(game);
    });
};

//update a goalie
function update(req, res) {
    Goalie.findOneAndUpdate(req.params.id, req.body, {new: true})
    .populate('requestor')
    .exec((err, game) => {
        if (err) {
            console.log("error: " + err);
            res.sendStatus(500);
        }
        res.json(goalie);
    });
};

//delete a goalie
function deleteGoalie(req, res) {
    Game.findOneAndDelete(req.params.id)
    .populate('requestor')
    .exec((err, game) => {
        if (err) {
            console.log("error: " + err);
            res.sendStatus(500);
        }
        res.json(game)
    });
};

//add create/delete/update review (seperate controller/router maybe needed)
