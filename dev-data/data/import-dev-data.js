const fs = require('fs')
const dotenv = require('dotenv')
dotenv.config({ path: 'config.env' })

const Tour = require('./../../models/tourModel')
const Review = require('./../../models/reviewModel')
const User = require('./../../models/userModel')

// DATABASE
const mongoose = require('mongoose')
const DB = process.env.DATABASE_LOCAL
mongoose.connect(DB, {}).then(con => {
    console.log('DB connection successful!')
}).catch(() => {
    console.log('Cannot connect to DB')
})

// READ JSON FILE
const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours.json`, 'utf-8'))
const users = JSON.parse(fs.readFileSync(`${__dirname}/users.json`, 'utf-8'))
const reviews = JSON.parse(fs.readFileSync(`${__dirname}/reviews.json`, 'utf-8'))

// IMPORT DATA INTO DATABASE
const importData = async () => {
    try {
        await Tour.create(tours)
        await Review.create(reviews)
        await User.create(users, { validateBeforeSave: false })
        console.log('Data successfully loaded!')
    } catch (err) {
        console.log(err)
    }
    process.exit()     // thoát khỏi run command
}

// DELETE ALL DATA FROM COLLECTION
const deleteData = async () => {
    try {
        await Tour.deleteMany()
        await User.deleteMany()
        await Review.deleteMany()
        console.log('Data successfully deleted!')
    } catch (err) {
        console.log(err)
    }
    process.exit()    // thoát khỏi run command
}
// "import": "node dev-data/data/import-dev-data.js --import",
// "delete": "node dev-data/data/import-dev-data.js --delete"
// process.argv[0]: node
// process.argv[1]: dev-data/data/import-dev/data.js
if (process.argv[2] === '--import') {
    importData()
} else if (process.argv[2] === '--delete') {
    deleteData()
}