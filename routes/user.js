const express = require('express')
const { register, login } = require('../Controllers/user')
const { registerValidation, validation, loginValidation } = require('../Middleware/Validator')

const router = express.Router()

router.post('/register', registerValidation(),validation,register)

router.post("/login" , loginValidation(),validation ,login)



module.exports= router