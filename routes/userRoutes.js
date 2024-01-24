const express = require('express');
// import controller of handlers
const userController = require('../controllers/userController');

// router midelewere
const router = express.Router();

// for users routes
router.route('').get(userController.getAllUsers).post(userController.postUsers);
router.route('/:id').get(userController.getUser).patch(userController.updateUser).delete(userController.deleteUser);

// export the router
module.exports = router;