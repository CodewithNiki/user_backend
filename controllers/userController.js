const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
const User = require("../models/userModule");

// const User = require("../models/userModule")
// @desc register users
// @routes POSt /api/users
// @access public
const registerUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;
    if(!username || !email || !password){
        res.status(404);
        throw new Error("All field are mandatory")
    }

    const userAvailable = await User.findOne({email});
    if(userAvailable){
        res.status(404);
        throw new Error("User already registered")
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10)
    // console.log('hashed password is:', hashedPassword);
    const user = await User.create({
        username, email, password:hashedPassword,
    });
    if(user){
        res.status(201).json({
            _id: user.id, email: user.email
        })    
    }else{
        res.status(400);
        throw new Error("User not created")
    }
    

    // res.status(200).json({
    //     message: "Register a user"
    // });
   
});

// @desc login a user
// @routes POsT /api/users/:id
// @access public
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if(!email || !password){
        res.status(404);
        throw new Error("All field are mandatory")
    }

    const user = await User.findOne({ email });
    // compare password with hashedPassword;
    if(user && (await bcrypt.compare(password, user.password))){
        const accessToken = jwt.sign({
            user: {
                username: user.username,
                email: user.email,
                id: user.id,
            }
        }, 
        process.env.ACCESS_TOKEN_SECRET, 
        {
            expiresIn: "1d"
        })
        res.status(200).json({accessToken});
    }else{
        res.status(401);
        throw new Error("Email or Password is invalid")
    }
})

// @desc get a user
// @routes GET /api/users
// @access private
const currentUser = asyncHandler(async (req, res) => {
    res.status(201).json(req.user)
})

module.exports = { currentUser, registerUser, loginUser }