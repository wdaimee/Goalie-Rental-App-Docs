const express = require('express');
const router = express.Router();
const requestors_reviewCtrl = require('../../controllers/api/requestor_reviews');

router.post('/:id/reviews', requestors_reviewCtrl.create);
router.delete('/reviews/:id', requestors_reviewCtrl.delete);

module.exports = router;