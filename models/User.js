const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
    type: String,
    required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phone_num: String,
    age: Number,
    goalie: {
    type: Boolean,
    required: true,
    default: false
    },
    sport: {
        type: [String],
        enum: ['hockey', 'lacrosse', 'soccer']
    },
    skill_level: {
        type: String,
        enum: ["A", "B", "C", "D", "Beginner"]
    },
    admin: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

const User = mongoose.model('User', userSchema);
module.exports = User;