const express = require('express');
const app = express();
const fs = require('fs');
const port = 3000;

// app.get('/', (req, res) => {
//     res
//     .status(200)
//     .json({
//         message: 'Hello from my first api',
//         app: 'Natorus'
//     });
// });

// app.post('/', (req, res) => {
//     res.send('This is a post endpoint');
// });

const tourData = JSON.parse(
    fs.readFileSync('./dev-data/data/tours-simple.json')
);

app.get('/api/v1/tours', (req, res) => {
    res.status(200).json({
        status: 'success',
        results: tourData.length,
        data: {
            tours: tourData
        }
    });
});

app.listen(port, () => {
    console.log('App running on port '+'127.0.0.1:'+port);
}); 