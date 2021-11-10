const mongoose = require('mongoose')
const { mongodb } = require('../keys/keys')

mongoose.connect(mongodb.URI, {useNewUrlParser: true})
    .then(db => console.log('Database is connected'))
    .catch(err => console.log(err))