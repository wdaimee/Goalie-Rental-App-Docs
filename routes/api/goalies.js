const express = require('express');
const router = express.Router();
const goaliesCtrl = require('../../controllers/api/goalies');

router.get('/', goaliesCtrl.index);
router.post('/', goaliesCtrl.create);
router.put('/:id', goaliesCtrl.update);
router.get('/:id', goaliesCtrl.show);
router.delete('/:id', goaliesCtrl.delete);

module.exports = router;