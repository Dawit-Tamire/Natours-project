const express = require('express')
const userController = require('../controllers/userController')
const authController = require('../controllers/authController')

const router = express.Router()

router.post('/signup', authController.signUp)
router.post('/login', authController.logIn)


router.patch('/resetPassword/:token', authController.resetPassword)

// Protect all routes after this middleware
router.use(authController.protect)

router.get('/logout', authController.logOut)
router.patch('/updateMyPassword', authController.updatePassword)
router.get('/me', userController.getMe, userController.getUser)
router.patch('/updateMe', userController.uploadUserPhoto, userController.resizeUserPhoto, userController.updateMe)
router.patch('/deleteMe', userController.deleteMe)

// Middleware DISTRIBUTION admin
router.use(authController.restrictTo('admin', 'user'))

router.route('/:id')
    .get(userController.getUser)
    .patch(userController.updateUser)
    .delete(userController.deleteUser)
router.route('/')
    .get(userController.getAllUsers)
    .post(userController.createUser)

module.exports = router