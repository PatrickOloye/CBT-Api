const User = require('../models/user.models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const sendEmail = require('../service/sendEmail.service');
const PasswordReset = require('../models/resetPassword.models');
const Exam = require('../models/exams.models');





exports.createUser = async(req, res)=>{
    try {
        const { firstName, lastName, email, password, username, } = req.body;
        if(!(firstName && lastName && email && password && username )){
            return res.status(409).send("All the field required")
        }
        const existingUser = await User.findOne({email})
        if(existingUser){
            return res.status(501).send("Your email exist in our database. Kindly login or use forgot password")
        };
        const salt = await bcrypt.genSalt(8);
        const hashedPassword = await bcrypt.hash(password, salt);

        const users = await User.create({
            firstName, 
            lastName, 
            email, 
            password: hashedPassword, 
            username,
        })
        await sendEmail({
            email: users.email,
            subject: `${users.firstName}, Verify your email`,
            message: `the link ${process.env.EMAIL_URL}/${users._id}, <br>
                       Kindly click on the link to verify your email`             
        })
        return res.status(201).send(users)
    } catch (error) {
        return res.status(500).send({
            error: error.message
        })
    }
}



exports.verifyEmail = async (req, res) => {
    try {
        const id  = req.params.id;
        const user = await User.findOne({ _id: id });
        if (user.isActive === true) {
            return res.status(400).json({
                status: 'fail',
                message: 'You have already verified your account, Kindly login with your details',               
            });
          };
          // update the user's status 
           await User.findByIdAndUpdate(
            { _id: user._id 
              
            },
            { $set: { isActive: true } },
            { new: true }        
            );
            await sendEmail({
                email: user.email,
                subject: 'Account verification successful',
                message: `Your account has been verified successfully. You can now proceed to login
                <br>
                <div>
                    <h1>Hello ${user.firstName}</h1>
                    <h3>email: ${user.email} </h3>
                    <h3>Status: ${user.status} </h3>
                </div>`              
              });
        return res.status(200).json({
            status: 'success',            
            message: 'User verified successfully',
        });
    } catch (error) {
        return res.status(400).json({
            status: 'fail',
            message: error.message
        });
    }
  };



exports.cbtLogin = async (req, res) => {
  const { password, username } = req.body;
  try {
    // validation
    if (!(password && username )) {
      return res.status(400).json({ message: 'Please fill all fields' });
    }
    // check if user exist in database
    const checkUser = await User.findOne({ username: username });
    // if user doesn't exist throw error
    if (!checkUser) {
      return res.status(404).json({ message: 'user not found' });
    }
     // check if status is pending
    if (checkUser.isActive === false ) {
      return res.status(400).json({ message: 'Your account is still pending, check your email box to verify your email' });
    }
    // if user exist in database, check if user password is correct
    const checkPassword = await bcrypt.compare(password, checkUser.password); 
    // if user password is not correct throw error ==> invalid credentials
    if (!checkPassword) {
        return res.status(400).send('invalid credentials (Wrong Email or Password' );
    }
    // if user password is correct tokenize the payload
    const payload = {
      _id: checkUser._id,
    };
    const token = await jwt.sign(payload, process.env.SECRET_KEY, {
      expiresIn: '5h',
    });
    // store token in cookie ====> web browser local storage
    res.cookie('access-token', token);
    res.status(200).json({ message: 'You have logged in successfully', user: checkUser, token: token });
      
  } catch (error) {
    return res
      .status(500)
      .json({ error: error.message, message: 'internal server error' });
  }
};


exports.studentViewDetails = async(req, res)=>{
  try {
    const id = req.user;
    const viewDetails = await User.findOne({ _id: id })
    if(viewDetails){
      return res.status(200).send(viewDetails)
    }
  } catch (error) {
    return res.status(500).send({
      error: error.message
    })
  }
}


exports.studentUpdateDetail = async(req, res)=>{
  try {
    const id = req.user;
    const { firstName, lastName } = req.body;
    const updateDetails = await User.findOne({ _id: id })
    if(updateDetails.roles === "user"){
      await User.findByIdAndUpdate(
        {
          _id: updateDetails._id
        },
        {
          firstName,
          lastName,          
        },
        {
          new: true
        }
      )
      return res.status(200).send(updateDetails)
    }
  } catch (error) {
    return res.status(500).send({
      error: error.message
    })
  }
}




exports.studentViewResult = async(req, res)=>{
  try {
    const id = req.user;
    const viewDetails = await Exam.findOne({ _id: id })
    if(viewDetails){
      return res.status(200).send(viewDetails)
    }
  } catch (error) {
    return res.status(500).send({
      error: error.message
    })
  }
}