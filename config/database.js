const mongoose = require('mongoose');

//connect to database using .env file
mongoose.connect(
    'mongodb://localhost:27017/goaliesappdb',
    {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
    }
);

const db = mongoose.connection;

db.on('connected', () => {
    console.log(`Connected to MongoDB at ${db.host}:${db.port}`);
});