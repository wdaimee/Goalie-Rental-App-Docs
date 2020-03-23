const express = require('express');
const router = express.Router();
const reviewCtrl = require('../../controllers/api/reviews');

router.post('/:id/reviews', reviewCtrl.create);
router.delete('/reviews/:id', reviewCtrl.delete);

module.exports = router;