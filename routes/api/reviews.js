const express = require('express');
const router = express.Router();
const reviewCtrl = require('../../controllers/api/reviews');

//get all reviews for a user
router.get('/:id/reviews', reviewCtrl.index);

//create a review
router.post('/:id/reviews', reviewCtrl.create);

//delete a review
router.delete('/reviews/:id', reviewCtrl.delete);

module.exports = router;