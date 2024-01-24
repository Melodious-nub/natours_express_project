// environment should be import before the app module
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

const app = require('./index');
const port = process.env.port;

// console.log(process.env);

app.listen(port, () => {
    console.log('App running on port ' + '127.0.0.1:' + port);
});

// this is our start point of the app. from here we will work for db conection error handling and many more