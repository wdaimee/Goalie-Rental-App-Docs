const Game = require('../../models/Game');
const Arena = require('../../models/Arena');
const User = require('../../models/User');

module.exports = {
    create,
    // requestor_history, /*--not working at the moment*/
    // goalie_history, /*--not working at the moment*/
    all_games,
    //add_goalie /*- not working at the moment*/,
    // requestor_game_state, /*- not working at the moment*/,
    // goalie_game_state, /*- not working at the moment*/,
    all_active,
    show,
    // create,
    update,
    delete: delete_game
};

//send a list of all games requested by a user, query for now(history)
function requestor_history(req, res) {
    Game.find({requestor: req.user, status: 'confirmed'})
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

//send a list of all games a goalie has played 
function goalie_history(req, res) {
    Game.find({goalie: req.user, status: 'confirmed'})
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

//see a list of active requests for the requestor - further testing required, adding gameState to query to see active, pending, or confirmed games
function requestor_game_state(req, res) {
    Game.find({status: req.query.gameState, requestor: req.user})
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

//see a list of pending/confirmed games for the goalie 
function goalie_game_state(req, res) {
    Game.find({status: req.query.gameState, goalie: req.user})
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

//function to view all active games available - works
function all_active(req, res) {
    Game.find({status: 'active', request_date: {$gt: new Date()}})
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

//function to add a goalie to the game - does not work
function add_goalie(req, res) {
    Game.findById(req.params.id, function(err, game) {
        if (err) {
            console.log("error: " + err);
            res.sendStatus(500);
        }
        if(req.user.goalie === true) {
            game.goalie = req.user;
            game.status = 'pending';
        }
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

//do not know if works
function confirm_game() {
    Game.findById(req.params.id, function(err, game) {
        if (err) {
            console.log('err:' + err);
            res.sendStatus(500);
        }
        if (game.requestor === req.user) {
            game.status = 'confirmed';
        }
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
            })
        })
    })
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

//create a new game (completed) - Req. Query is Not Working
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
