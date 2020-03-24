const express = require('express');
const router = express.Router();
const arenaCtrl = require('../../controllers/api/arenas');

//get all arenas
router.get('/', arenaCtrl.index);

//create an arena
router.post('/', arenaCtrl.create);

//get single arena
router.get('/:id', arenaCtrl.show);

//delete a review
router.delete('/:id', arenaCtrl.delete);

//edit an arena
router.put('/:id', arenaCtrl.update);

module.exports = router;