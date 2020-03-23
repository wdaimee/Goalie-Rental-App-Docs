const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    review_by: {},
    user_reviewed: {},
    content: String,
    rating: {
        type: Number,
        min: 1,
        max: 5
    },
}, {
    timestamps: true
})