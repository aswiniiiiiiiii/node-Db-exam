const userDetails = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Registration
exports.userRegistercontroller = async (req, res) => {
    console.log("Inside user-register controller");
    const { userId, firstName, lastName, email, password, phoneNumber } = req.body;

    try {
        const existingUser = await userDetails.findOne({ email });
        if (existingUser) {
            return res.status(406).json("Already existing User...");
        } else {
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(password, saltRounds);
            console.log("Hashed password:", hashedPassword);

            const newUser = new userDetails({
                userId, firstName, lastName, email, password: hashedPassword, phoneNumber
            });
            await newUser.save();
            console.log("New user saved:", newUser);
            res.status(200).json(newUser);
        }
    } catch (err) {
        res.status(401).json(err);
        console.log(err);
    }
};

// Login
exports.loginController = async (req, res) => {
    console.log("Inside LoginController");
    const { email, password } = req.body;

    try {
        const existingUser = await userDetails.findOne({ email });
        if (existingUser) {
            console.log("Stored user details:", existingUser);

            const decryptPassword = await bcrypt.compare(password, existingUser.password);
            console.log("Password match:", decryptPassword);

            if (decryptPassword) {
                const token = jwt.sign({ userId: existingUser._id }, process.env.jWTPASSWORD);
                res.status(200).json({ userDetails: existingUser, token });
            } else {
                res.status(404).json("Incorrect Password.");
            }
        } else {
            res.status(404).json("Incorrect email");
        }
    } catch (err) {
        console.log(err);
        res.status(401).json(err);
    }
};


// view all users
exports.allUserController = async(req,res)=>{
    console.log("inside allUserController");
    try{
        const allUsers = await userDetails.find({},'-password')
        res.status(200).json(allUsers)

    }catch(err){
        res.status(401).json(err)
    }
    
}


//View one user
exports.oneUserController = async(req,res)=>{
    console.log("inside oneUserController");
    const{email} =req.body

    try{
        const user = await userDetails.findOne({email})
        
        res.status(200).json({
            userId:user.userId,
            firstName:user.firstName,
            lastName:user.lastName,
            email:user.email,
            phone:user.phone

        })
    }catch(err){
        res.status(401).json(err)
    }
    
}

