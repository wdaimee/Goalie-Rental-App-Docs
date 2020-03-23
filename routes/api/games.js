const express = require('express');
const router = express.Router();
const gamesCtrl = require('../../controllers/api/games');

//get a list of all games
router.get('/', gamesCtrl.index);

//create a new game (anyone)
router.post('/', gamesCtrl.create);

//edit a game
router.put('/:id', gamesCtrl.update);

//view the details of a game
router.get('/:id', gamesCtrl.show);

//delete a game
router.delete('/:id', gamesCtrl.delete);

module.exports = router;