const Game = require('../../models/game');
const Arena = require('../../models/Arena');

module.exports = {
    index,
    show,
    create,
    update,
    delete: delete_game
};

//send all games as json response
function index(req, res) {
    Game.find({})
    .populate('goalie', 'requestor')
    .exec((err, games) => {
        if (err) {
            console.log("index error: " + err);
            res.sendStatus(500);
        }
        res.json(games);
    });
};

//get one game
function show(req, res) {
    Game.findById(req.params.id)
    .populate('goalie', 'requestor')
    .exec((err, game) => {
        if (err) {
            console.log('error: ' + err);
            res.sendStatus(500);
        }
        res.json(game);
    });
};

//create a new game
//need to complete adding requestor and goalie
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
        new_game.arena = arena;
    });
    new_game.save((err, game) => {
        if (err) {
            console.log("create error: " + err)
        }
        console.log("created game");
        res.json(game);
    });
};

//update a game
function update(req, res) {
    Game.findOneAndUpdate(req.params.id, req.body, {new: true})
    .populate('goalie', 'requestor')
    .exec((err, game) => {
        if (err) {
            console.log("error: " + err);
            res.sendStatus(500);
        }
        res.json(game);
    });
};

//delete a game
function delete_game(req, res) {
    Game.findOneAndDelete(req.params.id)
    .populate('goalie', 'requestor')
    .exec((err, game) => {
        if (err) {
            console.log("error: " + err);
            res.sendStatus(500);
        }
        res.json(game)
    });
};
