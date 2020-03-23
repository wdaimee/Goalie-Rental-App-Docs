const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const goalie_reviewSchema = new Schema({
    content: String,
    rating: {
        type: Number,
        min: 1,
        max: 5
    }
},{
    timestamps: true
});


const goalieSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    sport: [{
        type: [String],
        enum: ['hockey', 'soccer', 'lacrosse'], 
        required: true
    }],
    skill_level: {
        type: String,
        enum: ['A', 'B', 'C', 'D', 'Beginner'],
        required: true
    },
    contact_info: {
        type: String,
    },
    review: [goalie_reviewSchema],
    fav_requestors: [{type: Schema.Types.ObjectId, ref: 'Requestor'}]
},{
    timestamps: true
});

const Goalie = mongoose.model('Goalie', goalieSchema);
module.exports = Goalie;