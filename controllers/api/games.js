const Game = require('../../models/Game');
const Arena = require('../../models/Arena');
const User = require('../../models/User');


module.exports = {
    index,
    all_games,
    add_goalie,
    active,
    all_active,
    show,
    create,
    update,
    delete: delete_game
};

//send a list of all games requested by a user, query for now(history) - futher testing required
//send a list of all games a goalie has played if req.query.goalie exists
function index(req, res){
    if(req.query.requestor) {
        Game.find({requestor: req.query.requestor})
        .populate('requestor')
        .populate('arena')
        .populate('goalie')
        .exec((err, games) => {
            console.log(games);
            if (err) {
                console.log("error: " + err);
                res.sendStatus(500);
            }
            res.json(games);
        });
    }
    else if(req.query.goalie) {
        Game.find({goalie: req.query.goalie})
        .populate('requestor')
        .populate('arena')
        .populate('goalie')
        .exec((err, games) => {
            console.log(games);
            if (err) {
                console.log("error: " + err);
                res.sendStatus(500);
            }
            res.json(games);
        });
    }
};

//see a list of active requests for the requestor - further testing required
function active(req, res) {
    Game.find({goalie: null}).find({request_date: {$gt: new Date()}})
    .find({requestor: req.query.requestor})
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
}

//function to view all active games available - further testing required
function all_active(req, res) {
    Game.find({goalie: null}).find({request_date: {$gt: new Date()}})
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
}

//function to add a goalie to the game
function add_goalie(req, res) {

}

//send list of all games (completed)
function all_games(req, res) {
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
