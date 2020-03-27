const Game = require('../../models/Game');
const Arena = require('../../models/Arena');


module.exports = {
    create,
    requestor,
    goalie, 
    all_games,
    add_goalie,
    confirm_game,
    all_open,
    show,
    update,
    delete: delete_game
};

//send a list of games for a user by following sort: all, open, pending, confirmed - works
function requestor(req, res) {
    if(req.query.status === 'all') {
        Game.find({requestor: req.user})
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
    } else {
        Game.find({requestor: req.user, status: req.query.status})
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

//send a list of games a goalie has played - query for all, pending, confirmed - works
function goalie(req, res) {
    if(req.query.status === 'all') {
        Game.find({goalie: req.user})
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
    } else {
        Game.find({goalie: req.user, status: req.query.status})
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

//function to view all open games available - works
function all_open(req, res) {
    Game.find({status: 'open', request_date: {$gt: new Date()}})
    .populate('arena')
    .populate('goalie')
    .populate('requestor')
    .exec((err, games) => {
        console.log(games);
        if (err) {
            console.log("index error: " + err);
            res.sendStatus(500);
        }
        res.json(games);
    });
};

//function to add a goalie to the game - Works!
function add_goalie(req, res) {
    if (req.user.goalie === false ) {
        return res.json({response: 'You\'re not a goalie'});
    }
    Game.findById(req.params.id, function(err, game) {
        if (err) {
            console.log("error: " + err);
            res.sendStatus(500);
        }
        if (req.user.sport.includes(game.sport) === false) {
            return res.json({response: 'You don\'t play this sport'});
        }
        if (req.user.skill_level !== game.skill_level) {
            return res.json({response: 'You are not at the same skill level that this game requires'});
        }
        game.goalie = req.user;
        game.status = 'pending';
        game.save((err, game) => {
            if (err) {
                console.log("error: " + err);
                res.sendStatus(500);
            }
            Game.findOne(game)
            .populate('arena')
            .populate('requestor')
            .populate('goalie')
            .exec((err, game) => {
                if (err) {
                    console.log("error: " + err);
                    res.sendStatus(500);
                }
                res.json(game);
            });
        });
    });
};

//Works!
function confirm_game(req, res) {
    Game.findById(req.params.id, function(err, game) {
        if (err) {
            console.log('err:' + err);
            res.sendStatus(500);
        }
        console.log(req.user.id);
        console.log(game.requestor._id);
        if (req.user.id != game.requestor._id) {
            return res.json({response: 'You don\'t have access to confirm the game, only the requestor does.'})
        }
        game.status = 'confirmed';
        game.save((err, game) => {
            if (err) {
                console.log('err:' + err);
                res.sendStatus(500);
            }
            Game.findOne(game)
            .populate('arena')
            .populate('requestor')
            .populate('goalie')
            .exec((err, game) => {
                if (err) {
                    console.log("error: " + err);
                    res.sendStatus(500);
                }
                res.json(game);
            });
        });
    });
};

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

//create a new game (completed) - Working!
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
    new_game.requestor = req.user;
    console.log(new_game);
};

//update a game (completed)
function update(req, res) {
    Game.findById(req.params.id, function(err, game) {
        if (err) {
            console.log("error:" + err);
        }
        if (req.user.id != game.requestor._id) {
            return res.json({response: 'You don\'t have permission to edit this game, only the requestor can'})
        }
        Game.findByIdAndUpdate(req.params.id, req.body, {new: true})
        .exec((err, game) => {
            if (err) {
                console.log("error: " + err);
                res.sendStatus(500);
            }
            console.log(game);
            Game.find(game)
            .populate('arena')
            .populate('goalie')
            .populate('requestor')
            .exec((err, game) => {
                console.log(game);
                if (err) {
                    console.log('error: ' + err);
                    res.sendStatus(500);
                }
                res.json(game);
            });
        });
    });
};

//delete a game (completed)
function delete_game(req, res) {
    Game.findById(req.params.id, function(err, game) {
        if (err) {
            console.log("error: " + err);
            res.sendStatus(500);
        }
        if (req.user.id != game.requestor._id) {
            return res.json({response: "You don't have permission to delete this game."})
        }
        Game.findByIdAndDelete(game)
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
};
