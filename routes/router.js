const express = require('express')
const usercontroller = require('../controller/userController')
const jwtMiddleware = require('../middlewares/jwtMiddleware')

const  router = new express.Router()


//user registration to http://localhost:3001/user-register
router.post('/user-register',usercontroller.userRegistercontroller)

//login to http://localhost:3001/login
router.post('/login',usercontroller.loginController)

// one-users :http://localhost:3001/one-user
router.get('/one-user',jwtMiddleware,usercontroller.oneUserController)

// all-users : http://localhost:3001/all-users
router.get('/all-users',jwtMiddleware,usercontroller.allUserController)


module.exports = router