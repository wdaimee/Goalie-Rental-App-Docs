const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    review_by: {type: Schema.Types.ObjectId, ref: 'User'},
    user_reviewed: {type: Schema.Types.ObjectId, ref: 'User'},
    content: String,
    rating: {
        type: Number,
        min: 1,
        max: 5
    },
}, {
    timestamps: true
});

const Review = mongoose.model('Review', reviewSchema);
module.exports = Review;