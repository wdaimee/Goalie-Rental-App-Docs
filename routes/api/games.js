const express = require('express');
const router = express.Router();
const gamesCtrl = require('../../controllers/api/games');

//get a list of requestors history - working
router.get('/request', gamesCtrl.requestor);

//get a list of goalie history - working
router.get('/goalie', gamesCtrl.goalie);

//get a list of all active requests available (looks to be ok - further testing needed)
router.get('/open/all', gamesCtrl.all_open)

//get a list of all games (works)
router.get('/all', gamesCtrl.all_games);

// //create a new game (anyone) - Working
router.post('/', gamesCtrl.create);

//edit a game (works)
router.put('/:id', gamesCtrl.update);

//view the details of a game (works)
router.get('/:id', gamesCtrl.show);

//delete a game (works)
router.delete('/:id', gamesCtrl.delete);

//add a goalie to an active request - Seems to be working
router.put('/:id/add_goalie', gamesCtrl.add_goalie);

//requestor of the game to confirm the game after a goalie has joined
router.put('/:id/confirm', gamesCtrl.confirm_game);

module.exports = router;