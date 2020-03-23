const express = require('express');
const router = express.Router();
const reviewCtrl = require('../../controllers/api/reviews');

router.get('/:id/reviews', reviewCtrl.index);
router.post('/:id/reviews', reviewCtrl.create);
router.delete('/reviews/:id', reviewCtrl.delete);

module.exports = router;