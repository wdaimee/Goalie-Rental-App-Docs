const express = require('express');
const router = express.Router();
const gamesCtrl = require('../../controllers/api/games');

router.get('/', gamesCtrl.index);
router.post('/', gamesCtrl.create);
router.put('/:id', gamesCtrl.update);
router.get('/:id', gamesCtrl.show);
router.delete('/:id', gamesCtrl.delete);

module.exports = router;