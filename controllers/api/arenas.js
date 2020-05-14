const Arena = require('../../models/Arena');

module.exports = {
    index,
    show,
    create,
    update,
    delete: delete_arena
};

//send all arenas as json response
function index(req, res) {
    Arena.find({},(err, arenas) => {
        if (err) {
            console.log("index error: " + err);
            res.sendStatus(500);
        }
        res.json(arenas);
    });
};

//get one arena
function show(req, res) {
    Arena.findById(req.params.id, (err, arena) => {
        if (err) {
            console.log('error: ' + err);
            res.sendStatus(500);
        }
        res.json(arena);
    });
};

// create a new arena
function create(req, res) {
    Arena.create(req.body, function(err, arena) {
        if(err) {
            console.log("error: " + err);
            res.sendStatus(500);
        }
        res.json(arena);
    });
}

//update an arena
function update(req, res) {
    Arena.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, arena) => {
        if (err) {
            console.log("error: " + err);
            res.sendStatus(500);
        }
        res.json(arena);
    });
};

//delete an arena
function delete_arena(req, res) {
    console.log(req.params)
    Arena.findByIdAndDelete(req.params.id, (err, arena) => {
        if (err) {
            console.log("error: " + err);
            res.sendStatus(500);
        }
        res.json(arena);
    });
};