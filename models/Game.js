const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const gameSchema = new Schema({
    sport: {
        type: String,
        enum: ['hockey', 'lacrosse', 'soccer'],
        default: 'hockey',
        required: true
    },
    skill_level: {
        type: String,
        enum: ['A', 'B', 'C', 'D', 'Beginner'],
        required: true
    },
    city: {
        type: String,
        enum: ['Toronto', 'Mississauga', 'Brampton', 
        'North York', 'Richmond Hill', 'Markham', 'Scarborough'],
        required: true
    },
    arena: {type: Schema.Types.ObjectId, ref: 'Arena'},
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
    description: String,
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'open'],
        default: 'open'
    },
    requestor: {type: Schema.Types.ObjectId, ref: 'User'},
    goalie: {type: Schema.Types.ObjectId, ref: 'User'}
}, {
    timestamps: true
});

const Game = mongoose.model('Game', gameSchema);
module.exports = Game;