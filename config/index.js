const mongoose = require('mongoose');
require('dotenv').config();

const url = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.HOST}/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}



module.exports = {
    connectDB: function () {
        return mongoose.connect(url, connectionParams).then(() => {
            console.log('Connected to the database :)')
        }).catch((err) => {
            console.error(`Error connecting to the database. n${err}`);
        });
    }
}