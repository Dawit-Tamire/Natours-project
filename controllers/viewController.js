const Tour = require('../models/tourModel');
const Booking = require('../models/bookingModel');
const Review = require('../models/reviewModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.getOverview = catchAsync(async (req, res) => {
  // 1) Get tour data from collection
  const tours = await Tour.find();

  // 2) Build template

  // 3) Render that template using tour data from 1)
  res.status(200).render('overview', {
    title: 'All Tours',
    tours,
  });
});

exports.getTour = catchAsync(async (req, res, next) => {
  // 1) get the data, for the requested tour (including reviews and guides)  -> relative data
  // const tour = await Tour.findOne({ slug: req.params.slug }).populate({
  //     path: 'reviews',
  //     fields: 'review rating user'
  // })
  const tour = await Tour.findOne({slug: req.params.slug});
  if (!tour) {
    return next(new AppError('There is no tour with that name.', 404));
  }
  // 2) Build template

  // Render template using data from 1)
  res.status(200).render('tour', {
    title: `${tour.name} Tour`,
    tour,
  });
});

exports.searchTour = catchAsync(async (req, res, next) => {
  // 1) get the data, for the requested tour (including reviews and guides)  -> relative data
  const tours = await Tour.find(
    { 
      "$or":
        [{slug: {$regex: req.params.slug} }]
    }
  );
  if (!tours) {
    return next(new AppError('There is no tour with that name.', 404));
  }

  // 2) Build template

  // Render template using data from 1)
  res.status(200).render('overview', {
    title: `${tours.name} Tour`,
    tours,
  });
});

exports.getLoginForm = (req, res) => {
  if (res.locals.user) res.redirect('/'); // nếu đang đăng nhập rồi thì ko thể truy cập /login

  res.status(200).render('login', {
    title: 'Log into your account'
  });
};
exports.getSignupForm = (req, res) => {
  if (res.locals.user) res.redirect('/'); // nếu đang đăng nhập rồi thì ko thể truy cập /signup
  res.status(200).render('signup', {
    title: 'Sign up new account',
  });
};
exports.getResetPasswordForm = (req, res) => {
  if (res.locals.user) res.redirect('/');
  res.status(200).render('resetPassword', {
    title: 'Reset your password',
    resetToken: req.params.resetToken,
  });
};

exports.getAccount = (req, res) => {
  res.status(200).render('account', {
    title: 'Your account',
  });
};

exports.getMyTour = catchAsync(async (req, res, next) => {
  // 1) Get tour data from collection
  const bookings = await Booking.find({ user: req.user.id });

  const tourIds = bookings.map((el) => el.tour);
  const tours = await Tour.find({ _id: { $in: tourIds } });

  // 2) Render that template using tour data from 1)
  res.status(200).render('overview', {
    title: 'My tour',
    tours,
  });
});

exports.getMyBilling = catchAsync(async (req, res, next) => {
  // 1) Get tour data from collection
  const bookings = await Booking.find({ user: req.user.id });

  // 2) Render that template using tour data from 1)
  res.status(200).render('billing', {
    title: 'My bills',
    bookings,
  });
  
});


