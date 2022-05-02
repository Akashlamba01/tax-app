const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/taxData', {
    // useNewUrlParser: true,
    // useFindAndModify: false,
    // useUnifiedTopology: true

}).then(() => console.log('Connection Connected'))
    .catch((error) => {
        console.log('Not Connected')
    })