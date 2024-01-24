const express = require('express');
const app = express();
const morgan = require('morgan');
const port = 3000;

// import routes
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

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

// route mounting for separting files 1st step
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

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