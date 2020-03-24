const Game = require('../../models/Game');
const Arena = require('../../models/Arena');
const User = require('../../models/User');


module.exports = {
    index,
    show,
    create,
    update,
    delete: delete_game
};

//send list of all games (completed)
function index(req, res) {
    Game.find({})
    .populate('arena')
    .populate('goalie')
    .populate('requestor')
    .exec((err, games) => {
        if (err) {
            console.log("index error: " + err);
            res.sendStatus(500);
        }
        res.json(games);
    });
};

//get one game (completed)
function show(req, res) {
    Game.findById(req.params.id)
    .populate('arena')
    .populate('goalie')
    .populate('requestor')
    .exec((err, game) => {
        if (err) {
            console.log('error: ' + err);
            res.sendStatus(500);
        }
        res.json(game);
    });
};

//create a new game (completed)
function create(req, res) {
    const new_game = new Game({
        sport: req.body.sport,
        skill_level: req.body.skill_level,
        city: req.body.city,
        request_time: req.body.request_time,
        request_date: req.body.request_date,
        team_name: req.body.team_name,
        description: req.body.description
    });
    Arena.findOne({name: req.body.arena}, (err, arena) => {
        new_game.arena = arena._id;
        new_game.save((err, game) => {
            if (err) {
                console.log("error: " + err);
                res.sendStatus(500);
            }
            Game.findOne(game)
            .populate('arena')
            .populate('goalie')
            .populate('requestor')
            .exec((err, game) => {
                if (err) {
                    console.log("error: " + err);
                    res.sendStatus(500);
                }
                res.json(game);
            });
        });
    });
    new_game.requestor = req.body.requestor;
    new_game.goalie = req.body.goalie;
    console.log(new_game);
};

//update a game (completed)
function update(req, res) {
    Game.findByIdAndUpdate(req.params.id, req.body, {new: true})
    .exec((err, game) => {
        if (err) {
            console.log("error: " + err);
            res.sendStatus(500);
        }
        console.log(game);
        Game.findOne(game)
        .populate('arena')
        .populate('goalie')
        .populate('requestor')
        .exec((err, game) => {
            if (err) {
                console.log('error: ' + err);
                res.sendStatus(500);
            }
            res.json(game);
        });
    });
};

//delete a game (completed)
function delete_game(req, res) {
    Game.findByIdAndDelete(req.params.id)
    .populate('arena')
    .populate('goalie')
    .populate('requestor')
    .exec((err, game) => {
        if (err) {
            console.log("error: " + err);
            res.sendStatus(500);
        }
        res.json(game);
    });
};
