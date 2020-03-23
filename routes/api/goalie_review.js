const express = require('express');
const router = express.Router();
const goalies_reviewCtrl = require('../../controllers/api/goalie_reviews');

router.post('/:id/reviews', goalies_reviewCtrl.create);
router.delete('/reviews/:id', goalies_reviewCtrl.delete);

module.exports = router;