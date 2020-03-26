const express = require('express');
const router = express.Router();
const gamesCtrl = require('../../controllers/api/games');
const User = require('../../models/User');


router.use(function(req, res, next) {
    let userId = null;
    if (req.query.currentUserId) userId = req.query.currentUserId;
    if (req.body.currentUserId) userId = req.body.currentUserId;
    if (userId) {
      User.findById(userId, function(err, user) {
        req.user = user;
        next();
      });
    } else {
      next();
    }
  });

//get a list of all games requested by a user if req.query.requestor is true 
// or get a list of all games played by a goalie if req.query.goalie is true(history)
// router.get('/', gamesCtrl.index);

// //get a list of active requests for a requestor
// router.get('/active', gamesCtrl.active)

//get a list of requestors history - working
router.get('/request_history', gamesCtrl.requestor_history);

//get a list of goalie history - working
router.get('/goalie_history', gamesCtrl.goalie_history);

//get a list of all active requests available (looks to be ok - further testing needed)
router.get('/active/all', gamesCtrl.all_active)


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