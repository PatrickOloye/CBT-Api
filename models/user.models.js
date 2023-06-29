const mongoose = require('mongoose');



const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        trim: true,
    },
    lastName: {
        type: String,
        trim: true,
    },
    email: {
        type: String,
        trim: true,
        unique: true,
    },
    username: {
        type: String,
        unique: true,
        trim: true,
        lowercase: true,
        required: true
    },
    password: {
        type: String,
        trim: true,
        required: true
    },
    isActive: {
        type: Boolean,
        default: false
    },
    roles: {
        type: String,
        enum: [ 'user', 'admin', 'superadmin' ],
        default: 'user'
    },
    loginCount: {
        type: Number,
        default: 0
    }
},
{
    timestamps: true
});

userSchema.methods.incrementLoginCount = function() {
  this.loginCount += 1;
  return this.save();
};
// loginCount to be stored in the database
userSchema.pre("save", function(next) {
    this._loginCount = this.loginCount || 0;
    next();
});




module.exports = mongoose.model("User", userSchema);
