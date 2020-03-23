const express = require('express');
const router = express.Router();
const userCtrl = require('../../controllers/api/users');

router.get('/', userCtrl.index);
router.post('/', userCtrl.create);
router.put('/:id', userCtrl.update);
router.get('/:id', userCtrl.show);
router.delete('/:id', userCtrl.delete);

module.exports = router;