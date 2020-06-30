const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        maxlength: 32,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        maxlength: 32,
        trim: true
    },
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: Number,
        default: 0
    },
    purchases: {
        type: Array,
        default: []
    }
}, {
    timestamps: true
})

userSchema.pre("save", async function (next) {
    const user = this

    if (user.isModified("password")) {
        user.password = await bcrypt.hash(user.password, 8)
    }

    next()
})

userSchema.methods.authenticate = async function (plain_pass) {
    const user = this

    const isMatch = await bcrypt.compare(plain_pass, user.password)
    return isMatch
}

userSchema.methods.toJSON = function () {
    const user = this
    const userObject = user.toObject()

    delete userObject.password
    return userObject
}



const User = mongoose.model('User', userSchema)

module.exports = User