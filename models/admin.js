const mongoose = require('mongoose');
const path = require('path');
const bcrypt = require('bcrypt');

const adminSchema = new mongoose.Schema({

    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    },
    name: {
        type: String,
        required: true
    }

}, {
    timestamps: true
});




adminSchema.pre('save', async function (next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10);
        next();
    }
})

const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;