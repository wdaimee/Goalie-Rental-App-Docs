const express = require('express');
const router = express.Router();
const requestorCtrl = require('../../controllers/api/requestors');

router.get('/', requestorCtrl.index);
router.post('/', requestorCtrl.create);
router.put('/:id', requestorCtrl.update);
router.get('/:id', requestorCtrl.show);
router.delete('/:id', requestorCtrl.delete);

module.exports = router;