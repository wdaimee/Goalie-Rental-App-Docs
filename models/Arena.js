const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const arenaSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        city: {
            type: String,
            required: true,
        },
        address: String
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Arena', arenaSchema);