const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect(
    'mongodb://localhost/belt_exam',
    {useNewUrlParser: true},
);

module.exports = mongoose;