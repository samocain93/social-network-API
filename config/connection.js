const { connect, connection } = require('mongoose');

// Connect to the Mongo DB
const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/bchubDB';

connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

module.exports = connection;