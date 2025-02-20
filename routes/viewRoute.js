const express = require('express');
const bookingController = require('./../controllers/bookingController');
const viewController = require('./../controllers/viewController');
const authController = require('../controllers/authController');

const router = express.Router();

router.get('/', bookingController.createBookingCheckout, authController.isLoggedIn, viewController.getOverview);
router.get('/tour/:slug', authController.isLoggedIn, viewController.searchTour);
router.get('/tour/:slug/details', authController.isLoggedIn, viewController.getTour);
router.get('/login', authController.isLoggedIn, viewController.getLoginForm);
router.get('/signup', authController.isLoggedIn, viewController.getSignupForm);

router.get(
  '/resetPassword/:resetToken',
  authController.isLoggedIn,
  viewController.getResetPasswordForm
);

router.get('/my-tours', authController.protect, viewController.getMyTour);
router.get('/my-billings', authController.protect, viewController.getMyBilling);

router.get('/me', authController.protect, viewController.getAccount);

module.exports = router;
