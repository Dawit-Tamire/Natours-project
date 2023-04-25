const moongose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const crypto = require('crypto')        // có sẵn trong node

const userSchema = new moongose.Schema({
    name: {
        type: String,
        required: [true, 'Please tell us your name!'],
    },
    email: {
        type: String,
        required: [true, 'Please provide your email'],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, 'Please provide a valid email']
    },
    photo: {
        type: String,
        default: 'default.jpg'
    },
    role: {
        type: String,
        enum: ['user', 'guide', 'lead-guide', 'admin'],
        default: 'user'
    },
    password: {
        type: String,
        required: [true, 'Please provide a password'],
        minlength: 6,
        select: false        // default not send to client by find .. (query)
    },
    passwordConfirm: {
        type: String,
        required: [true, 'Please confirm your password'],
        validate: {
            // This only works on CREATE and SAVE
            validator: function (value) {
                return value === this.password
            },
            message: 'Passwords are not the same!'
        }
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        select: false      // default not send to client by find .. (query)
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
    active: {
        type: Boolean,
        default: true,
        select: false     // default not send to client by find .. (query)
    },
    deletedAt: Date,
})

// Document Middleware
userSchema.pre('save', async function (next) {
    // Only run this function if password was actually modified
    if (!this.isModified('password')) return next()
    // Hash password with cost of 12
    this.password = await bcrypt.hash(this.password, 12)
    // Delete passwordConfirm field  
    this.passwordConfirm = undefined
    next()
})

userSchema.pre('save', function (next) {
    if (!this.isModified('password') || this.isNew) return next()
    this.passwordChangedAt = Date.now() - 1000
    next()
})

// Query Middleware
userSchema.pre(/^find/, function (next) {
    this.find({ active: { $ne: false } })
    next()
})

// Set up method for Model User
userSchema.methods.correctPassword = async function (candidatePassword, userPassword) {
    return await bcrypt.compare(candidatePassword, userPassword)
}

userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
    if (this.passwordChangedAt) {
        const changedTimestamp = parseInt(this.passwordChangedAt.getTime() / 1000, 10)
        // console.log(this.passwordChangedAt, JWTTimestamp)
        return JWTTimestamp < changedTimestamp
    }
    //False means NOT changed
    return false
}

userSchema.methods.createPasswordResetToken = function () {
    const resetToken = crypto.randomBytes(32).toString('hex')
    this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex')
    this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

    // console.log({ resetToken }, this.passwordResetToken)
    return resetToken
}

const User = moongose.model('User', userSchema)

module.exports = User