const User = require('../../models/User');

module.exports = {
    index,
    show,
    create,
    update,
    delete: delete_user
};

//send all users as json response
function index(req, res) {
    User.find({},(err, users) => {
        if (err) {
            console.log("index error: " + err);
            res.sendStatus(500);
        }
        res.json(users);
    });
};

//get one User
function show(req, res) {
    User.findById(req.params.id, (err, user) => {
        if (err) {
            console.log('error: ' + err);
            res.sendStatus(500);
        }
        res.json(user);
    });
};

// create a new user
function create(req, res) {
    User.create(req.body, function(err, user) {
        res.json(user);
    });
}

//update a user
function update(req, res) {
    User.findOneAndUpdate(req.params.id, req.body, {new: true}, (err, user) => {
        if (err) {
            console.log("error: " + err);
            res.sendStatus(500);
        }
        res.json(user);
    });
};

//delete a user
function delete_user(req, res) {
    User.findOneAndDelete(req.params.id, (err, user) => {
        if (err) {
            console.log("error: " + err);
            res.sendStatus(500);
        }
        res.json(user);
    });
};
