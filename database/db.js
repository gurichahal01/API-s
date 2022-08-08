const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/RENTE_APP_db');
let con = mongoose.connection;
con.once('open', (err) => {
    try {
        console.log('database is connected succefully')
    } catch {
        console.log('Error')
    }
})

module.exports = con