const Tour = require('../models/tourModel')
const catchAsync = require('../utils/catchAsync')
const AppError = require('../utils/appError')
const factory = require('./handlerFactory')
const multer = require('multer')   // upload file
const sharp = require('sharp')   // resize photo

const multerStorage = multer.memoryStorage()
const multerFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image')) {         // if file is a image
        cb(null, true)
    } else {
        cb(new AppError('Not an image! Please upload only images', 400), false)
    }
}
const upload = multer({
    storage: multerStorage,
    fileFilter: multerFilter
})

exports.uploadTourImages = upload.fields([
    { name: 'imageCover', maxCount: 1 },    // upload.single('imageCover')   => req.file
    { name: 'images', maxCount: 3 }         // upload.array('images',5)     => req.files
])
exports.resizeTourImages = catchAsync(async (req, res, next) => {
    if (!req.files.imageCover || !req.files.images) return next()
    // 1) Cover image
    req.body.imageCover = `tour-${req.params.id}-${Date.now()}-cover.jpeg`
    await sharp(req.files.imageCover[0].buffer)
        .resize(2000, 1333)
        .toFormat('jpeg')
        .jpeg({ quality: 90 })
        .toFile(`public/img/tours/${req.body.imageCover}`)
    // 2) Images
    req.body.images = []
    await Promise.all(
        req.files.images.map(async (file, index) => {
            const filename = `tour-${req.params.id}-${Date.now()}-${index + 1}.jpeg`
            await sharp(file.buffer)
                .resize(2000, 1333)
                .toFormat('jpeg')
                .jpeg({ quality: 90 })
                .toFile(`public/img/tours/${filename}`)
            req.body.images.push(filename)
        })
    )
    next()
})

exports.getAllTours = factory.getAll(Tour)

exports.getTour = factory.getOne(Tour)

exports.createTour = factory.createOne(Tour)

exports.updateTour = factory.updateOne(Tour)

exports.deleteTour = factory.deleteOne(Tour)
