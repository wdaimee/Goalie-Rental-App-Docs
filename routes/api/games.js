const express = require('express');
const router = express.Router();
const gamesCtrl = require('../../controllers/api/games');

//get a list of all games requested by a user if req.query.requestor is true 
// or get a list of all games played by a goalie if req.query.goalie is true(history)
router.get('/', gamesCtrl.index);

//get a list of active requests for a requestor
router.get('/active', gamesCtrl.active)

//get a list of all active requests available
router.get('/active/all', gamesCtrl.all_active)

//get a list of all games
router.get('/all', gamesCtrl.all_games);

//create a new game (anyone)
router.post('/', gamesCtrl.create);

//edit a game
router.put('/:id', gamesCtrl.update);

//view the details of a game
router.get('/:id', gamesCtrl.show);

//delete a game
router.delete('/:id', gamesCtrl.delete);

//add a goalie to an active request
router.post('/:id', gamesCtrl.add_goalie);

module.exports = router;