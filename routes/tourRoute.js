const express = require('express')
const router = express.Router()
const tourController = require('../controllers/tourController')
const authController = require('../controllers/authController')

router.route('/')
    .get(tourController.getAllTours)
    .post(authController.protect, authController.restrictTo('admin', 'lead-guide'), tourController.createTour)

module.exports = router