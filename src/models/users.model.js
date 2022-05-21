const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    trim: true,
    match: /(?=.*[a-zA-Z])(?=.*[0-9]+).*/,
    minlength: 8
  },
  email: {
    type: String,
    required: true,
    match: /(?=.*[a-zA-Z])(?=.*[0-9]+).*/,
    minlength: 8
  },  
  birthdate: {
    type: String,
    required: true,
    match: /(?=.*[a-zA-Z])(?=.*[0-9]+).*/,
    minlength: 8
  },  
  bio: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    unique: true
  }
});

const Users = mongoose.model('Users', userSchema);
module.exports = Users;