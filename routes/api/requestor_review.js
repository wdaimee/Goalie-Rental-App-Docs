const express = require('express');
const router = express.Router();
const requestors_reviewCtrl = require('../../controllers/api/requestor_review');

router.get('/:id/reviews', requestors_reviewCtrl.index);
router.post('/:id/reviews', requestors_reviewCtrl.create);
router.delete('/reviews/:id', requestors_reviewCtrl.delete);
router.put('/reviews/:id', requestors_reviewCtrl.update);

module.exports = router;