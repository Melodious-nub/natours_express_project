const fs = require('fs');

// this is ssyncronous call for read data, and it is a top level code
const tourData = JSON.parse(
    fs.readFileSync('./dev-data/data/tours-simple.json')
);

// param middlewere for checking id before exicute apis for error check
exports.checkId = (req, res, next, val) => {
    console.log(`The id is: ${val}`);
    if ((req.params.id * 1) > tourData.length) {
        return res.status(404).json({
            status: "failed",
            lastRequestTime: req.requestTime,
            message: "Not found"
        });
    }
    next();
}

// middlewere for check if req.body is exist
exports.checkBody = (req, res, next) => {
    if (!req.body.name || !req.body.price) {
        return res.status(400).json({
            status: 'failed',
            message: 'Bad request'
        })
    }
    next();
}

// all tour handlers
exports.getAllTour = (req, res) => {
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

exports.postAllTour = (req, res) => {
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

exports.updateTour = (req, res) => {
    res.status(200).json({
        status: "success",
        lastRequestTime: req.requestTime,
        data: {
            tour: "<Updated tour here.."
        }
    })
}

exports.getTourById = (req, res) => {
    // req.params.id = string, so * 1 is for convert sting to number
    const id = req.params.id * 1;
    // this is simple javascript method find for finding something from a array ob objects
    const tourFiltered = tourData.find(el => el.id === id);

    // validation if id is not in the db
    // we can achiver it by many way as example here is two possible solution
    // if (id > tourData.length) {
    // if (!tourFiltered) {
    //     return res.status(404).json({
    //         status: "failed",
    //         lastRequestTime: req.requestTime,
    //         message: "Not found"
    //     });
    // }

    res.status(200).json({
        status: "success",
        lastRequestTime: req.requestTime,
        data: {
            tour: tourFiltered
        }
    });
}

exports.deleteTour = (req, res) => {
    res.status(204).json({
        status: "success",
        lastRequestTime: req.requestTime,
        data: null
    });
}

// for export all handler as separte functions. we use export.functionName
