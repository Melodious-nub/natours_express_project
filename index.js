const express = require('express');
const app = express();
const fs = require('fs');
const morgan = require('morgan');
const port = 3000;

// middlewere for req.body as json format
// important tip is call middlewere always top on the code
app.use(express.json());

// third party middlewere import (morgan) for development purposes
app.use(morgan('dev'));

// custom middlewere it is must to pass next() on middlewere, otherwise function is not completed
app.use((req, res, next) => {
  // here you can create any req property and send the data from here
  req.requestTime = new Date().toISOString();
  next();
});

// this is ssyncronous call for read data, and it is a top level code
const tourData = JSON.parse(
  fs.readFileSync('./dev-data/data/tours-simple.json')
);

// refactoring code with more readable for all api calls
// all route handlers
const getAllTour = (req, res) => {
    res.status(200).json({
      status: 'success',
      results: tourData.length,
      // last time is added to our res from middlewere
      lastRequestTime: req.requestTime,
      data: {
        tours: tourData
      }
    });
}

const postAllTour = (req, res) => {
    const newId = (tourData.length - 1) + 1;
    const newTour = Object.assign({ id: newId }, req.body);
  
    tourData.push(newTour);
  
    fs.writeFile('./dev-data/data/tours-simple.json', JSON.stringify(tourData), () => {
      res.status(201).json({
        status: "success",
        lastRequestTime: req.requestTime,
        data: {
          tours: newTour
        }
      })
    })
}

const updateTour = (req, res) => {
    if((req.params.id * 1) > tourData.length) {
        return res.status(404).json({
            status: "failed",
            lastRequestTime: req.requestTime,
            message: "Not found"
        });
    }

    res.status(200).json({
        status: "success",
        lastRequestTime: req.requestTime,
        data: {
            tour: "<Updated tour here.."
        }
    })
}

const getTourById = (req, res) => {
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
        lastRequestTime: req.requestTime,
        message: "Not found"
      });
    }
  
    res.status(200).json({
      status: "success",
      lastRequestTime: req.requestTime,
      data: {
        tour: tourFiltered
      }
    });
}

const deleteTour = (req, res) => {
    if((req.params.id * 1) > tourData.length) {
        return res.status(404).json({
            status: "failed",
            lastRequestTime: req.requestTime,
            message: "Not found"
        });
    }

    res.status(204).json({
        status: "success",
        lastRequestTime: req.requestTime,
        data: null
    });
}

// these are commented out because app.route serve as same purpose
// for getting all tours
// app.get('/api/v1/tours', getAllTour);
// for posting tour data
// app.post('/api/v1/tours', postAllTour);
// for getting tours with id
// app.get('/api/v1/tours/:id', getTourById);
// patch & delete method for understanding how it works, in realword we work with db not files, if we do with files, have to implements many code, let's skip these for now
// app.patch('/api/v1/tours/:id', updateTour);
// delete tour data route
// app.delete('/api/v1/tours/:id', deleteTour);

// more simple and best way to hangle routes. SO we can change single route for multiple purposes
app.route('/api/v1/tours').get(getAllTour).post(postAllTour);
app.route('/api/v1/tours/:id').get(getTourById).patch(updateTour).delete(deleteTour);

// delete commneted out with out refactor code
// app.delete('/api/v1/tours/:id', (req, res) => {
//     if((req.params.id * 1) > tourData.length) {
//         return res.status(404).json({
//             status: "failed",
//             message: "Not found"
//         });
//     }

//     res.status(204).json({
//         status: "success",
//         data: null
//     });
// });

app.listen(port, () => {
  console.log('App running on port ' + '127.0.0.1:' + port);
});