const config = require('config');
const mongoose = require('mongoose');


module.exports = function (){
    const url = config.get('db');
    mongoose.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    }).then(() => {
        console.log('Connected to the database.');
    }).catch((err) => {
        console.error('Could not connect to the database', err);
    });
}