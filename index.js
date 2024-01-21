const express = require('express');
const app = express();
const fs = require('fs');
const port = 3000;

// middlewere for req.body as json format
app.use(express.json());

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

// for getting all tours
app.get('/api/v1/tours', (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tourData.length,
    data: {
      tours: tourData
    }
  });
});

// for posting tour data
app.post('/api/v1/tours', (req, res) => {
  // console.log(req.body);
  // res.send('Success');
  const newId = (tourData.length - 1) + 1;
  const newTour = Object.assign({ id: newId }, req.body);

  tourData.push(newTour);

  fs.writeFile('./dev-data/data/tours-simple.json', JSON.stringify(tourData), () => {
    res.status(201).json({
      status: "success",
      data: {
        tours: newTour
      }
    })
  })
});

// for getting tours with id
app.get('/api/v1/tours/:id', (req, res) => {
  // req.params.id = string, so * 1 is for convert sting to number
  const id = req.params.id * 1;
  // this is simple javascript method find for finding something from a array ob objects
  const tourFiltered = tourData.find(el => el.id === id);

  // validation if id is not in the db
  // we can achiver it by many way as example here is two possible solution
  // if (id > tourData.length) {
  if (!tourFiltered) {
    return res.status(404).json({
      status: "failed",
      message: "Not found"
    });
  }

  res.status(200).json({
    status: "success",
    data: {
      tour: tourFiltered
    }
  });
});

app.listen(port, () => {
  console.log('App running on port ' + '127.0.0.1:' + port);
});