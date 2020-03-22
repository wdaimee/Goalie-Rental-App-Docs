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

const Arena = mongoose.model('Arena', arenaSchema);
module.exports = Arena;