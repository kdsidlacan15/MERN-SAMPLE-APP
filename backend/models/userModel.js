const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const Schema = mongoose.Schema

const userSchema = new Schema ({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
})

// static signup method
userSchema.statics.signup = async function (email, password) {

  // validation
  if (!email || !password) {
    throw Error('All fields must be filled')
  }

  if (!validator.isEmail(email)){
    throw Error('Please use valid Email')
  }

  if (!validator.isStrongPassword(password)) {
    throw Error('Your password must be at least 8 characters long, contain at least one number and a symbol and have a mixture of uppercase and lowercase letters.')
  }
  
  const emailExists = await this.findOne( { email } )


  if (emailExists) {
    throw Error('Email already exists')
  }

  // hash password
  const salt = await bcrypt.genSalt(10)
  const hash = await bcrypt.hash(password, salt)
  
  const user = await this.create({ email, password: hash})

  return user
}

// static login method
userSchema.statics.login = async function(email, password) {
   // validation
   if (!email || !password) {
    throw Error('All fields must be filled')
  }

  const user = await this.findOne( { email } )

  if (!user) {
    throw Error('Incorrect email')
  }

  // match password
  const matchedPassword = await bcrypt.compare(password, user.password)

  if(!matchedPassword) {
    throw Error('Incorrect password')
  }

  return user
}

module.exports = mongoose.model('User', userSchema)