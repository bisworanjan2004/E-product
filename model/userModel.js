
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    address: {
        type: String
    },
    dob:{
        type: String,
        required: true,  
    }
}, {
    timestamps: true,
    versionKey:false
});

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;
