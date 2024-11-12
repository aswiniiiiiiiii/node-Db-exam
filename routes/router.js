const express = require('express')
const usercontroller = require('../controller/userController')
const jwtMiddleware = require('../middlewares/jwtMiddleware')

const  router = new express.Router()


//user registration to http://localhost:3000/user-register
router.post('/user-register',usercontroller.userRegistercontroller)

//login to http://localhost:3000/login
router.get('/all-users',jwtMiddleware,usercontroller.allUserController)

// one-users
router.get('/one-user',jwtMiddleware,usercontroller.oneUserController)

module.exports = router