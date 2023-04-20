const express = require('express');
const viewController = require('./../controllers/viewController');
const authController = require('../controllers/authController');
const bookingController = require('../controllers/bookingController');

const router = express.Router();

router.get('/', authController.isLoggedIn, viewController.getOverview);
router.get('/tour/:slug', authController.isLoggedIn, viewController.getTour);
router.get('/login', authController.isLoggedIn, viewController.getLoginForm);
router.get('/signup', authController.isLoggedIn, viewController.getSignupForm);
router.get(
  '/forgotPassword',
  authController.isLoggedIn,
  viewController.getForgotPasswordForm
);
router.get(
  '/resetPassword/:resetToken',
  authController.isLoggedIn,
  viewController.getResetPasswordForm
);

router.get('/my-tours', authController.protect, viewController.getMyTour);

router.get('/me', authController.protect, viewController.getAccount);

router.get('/api/sessions/oauth/google', authController.loginWithGoogle);
router.get('/oauth/facebook', authController.loginWithFacebook);

module.exports = router;
