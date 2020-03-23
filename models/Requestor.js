const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const requestor_reviewSchema = new Schema({
    content: String,
    rating: {
        type: Number,
        min: 1,
        max: 5
    }
},{
    timestamps: true
});

const requestorSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
    },
    contact_info: {
        type: String,
        required: true
    },
    review: [requestor_reviewSchema],
    fav_goalies: [{type: Schema.Types.ObjectId, ref: 'Goalie'}]
}, {
    timestamps: true
});

const Requestor = mongoose.model('Requestor', requestorSchema);
module.exports = Requestor;