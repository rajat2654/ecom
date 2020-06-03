const mongoose = require('mongoose')
const crypto = require('crypto')
const uuidv1 = require('uuid/v1')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxlength: 32,
        trim: true
    },
    lastName: {
        type: String,
        maxlength: 32,
        trim: true
    },
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    userinfo: {
        type: String
    },
    encry_password: {
        type: String,
        required: true,
        trim: true
    },
    salt: String,
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

userSchema.virtual("password")
    .set(function (password) {
        this._password = password
        this.salt = uuidv1()
        this.encry_password = this.securePass(password)
    })
    .get(function () {
        return this._password
    })

userSchema.methods = {

    authenticate: function (plain_pass) {
        return this.securePass(plain_pass) === this.encry_password
    },

    securePass: function (plain_pass) {
        if (!plain_pass) return ""
        try {
            return crypto.createHmac('sha256', this.salt)
                .update(plain_pass)
                .digest('hex')
        } catch (error) {
            return ""
        }
    }
}

userSchema.methods.toJSON = function () {
    const user = this
    const userObject = user.toObject()

    delete userObject.encry_password
    delete userObject.salt
    return userObject
}



const User = mongoose.model('User', userSchema)

module.exports = User