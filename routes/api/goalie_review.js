const express = require('express');
const router = express.Router();
const goalies_reviewCtrl = require('../../controllers/api/goalie_reviews');

router.get('/:id/reviews', goalies_reviewCtrl.index);
router.post('/:id/reviews', goalies_reviewCtrl.create);
router.delete('/reviews/:id', goalies_reviewCtrl.delete);
router.put('/reviews/:id', goalies_reviewCtrl.update);

module.exports = router;