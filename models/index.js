const mongoose = require('mongoose');

mongoose.set('debug', true); //display queries on console
mongoose.Promise = Promise; //async func returns promises makesure we
// can use Promise es2017
mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost/warbler', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
});

module.exports.User = require('./user');
module.exports.Message = require('./message');


