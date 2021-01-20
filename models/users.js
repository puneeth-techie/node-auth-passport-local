const Joi = require('@hapi/joi');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        minLength: 5,
        maxlength: 255
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const Users = mongoose.model('Users', userSchema);

function validateUser(user){
    const schema = {
        name: Joi.string().min(5).max(255).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(5).max(255).required(),
        confirmPassword: Joi.any().valid(Joi.ref('password')).required().options({ language: { any: { allowOnly: 'must match password' } } })
    }
    return Joi.validate(user, schema);
}

exports.Users = Users;
exports.validateUser = validateUser;