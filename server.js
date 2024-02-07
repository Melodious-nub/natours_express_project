// environment should be import before the app module
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require('./index');

dotenv.config({ path: './config.env' });
const port = process.env.port;
const DB = process.env.DATABASE;

// console.log(process.env.DATABASE);
// in one line callback
mongoose.connect(DB).then(() => console.log('Database is connected'));

app.listen(port, () => {
    console.log('App running on port ' + '127.0.0.1:' + port);
});

// this is our start point of the app. from here we will work for db conection error handling and many more