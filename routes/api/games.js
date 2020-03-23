const express = require('express');
const router = express.Router();
const gamesCtrl = require('../../controllers/api/games');

//get a list of all games submitted by user (history)
router.get('/', gamesCtrl.index);

//show active games that do not have a goalie assigned
router.get('/active', gamesCtrl.active)

//get a list of all games submitted by all users (admin only)
router.get('/all', gamesCtrl.all_games);

//create a new game (anyone)
router.post('/', gamesCtrl.create);

//view a form for submitting a new game
router.get('/new', gamesCtrl.new);

//view a form for edditing a game(restrict to user who created the game)
router.get('/:id/edit', gamesCtrl.edit);

//handle edit game form being submitted to update game(restricted to user who created the game)
router.put('/:id', gamesCtrl.update);

//view the details of any game
router.get('/:id', gamesCtrl.show);

//delete a game(restricted to the user who created the game)
router.delete('/:id', gamesCtrl.delete);

//Add the goalie who wants to fill an active request
router.post('/:id', gamesCtrl.add_goalie)

module.exports = router;