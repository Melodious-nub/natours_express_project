const app = require('./index');
const port = 3000;

app.listen(port, () => {
    console.log('App running on port ' + '127.0.0.1:' + port);
});

// this is our start point of the app. from here we will work for db conection error handling and many more