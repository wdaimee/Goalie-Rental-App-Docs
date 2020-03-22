const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const gameSchema = new Schema({
    sport: {
        type: String,
        enum: ['hockey', 'lacrosse', 'soccer'],
        default: 'hockey',
        required: true
    },
    city: {
        type: String,
        enum: ['Toronto', 'Mississauga', 'Brampton', 
        'North York', 'Richmond Hill', 'Markham', 'Scarborough'],
        required: true
    },
    arena: [{type: Schema.Types.ObjectId, ref: 'Arena'}],
    request_time: {
        type: String,
        required: true
    },
    request_date: {
        type: Date,
        required: true
    },
    team_name: {
        type: String,
        required: true
    },
    Description: String,
    requestor: [{type: Schema.Types.ObjectId, ref: 'Requestor'}],
    goalie: [{type: Schema.Types.ObjectId, ref: 'Goalie'}]
}, {
    timestamps: true
});

module.exports = mongoose.model('Game', gameSchema);