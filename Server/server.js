// Variable Environment
const dotenv = require('dotenv')
dotenv.config({ path: './config.env' })

// Catch Error Code    
process.on('uncaughtException', err => {
    console.log('UNCAUGHT EXCEPTION!! Shutting down...')
    console.log(err)
    process.exit(1)
})

const app = require('./app')

// DATABASE
const mongoose = require('mongoose')
const DB = process.env.DATABASE_LOCAL
mongoose.connect(DB, {}).then(con => {
    console.log('DB connection successful!')
})

// Start Server
const port = process.env.PORT || 8080
const server = app.listen(port, () => {
    console.log(`App listening on port ${port}...`)
})

// catch lỗi kết nối database
// Error outside Express (ko phải lỗi server)
process.on('unhandledRejection', (err) => {
    // console.log(err)
    console.log('UNHANDLER REJECTION!! Shutting down...')
    server.close(() => {
        process.exit(1)
    })
})
// sigterm signal  => heroku sau 24h ...
process.on('SIGTERM', () => {
    console.log('SIGTERM RECEIVED. Shutting down gracefully')
    server.close(() => {
        console.log('Process terminated')
    })
})



