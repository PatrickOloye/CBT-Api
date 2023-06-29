const bcrypt = require('bcrypt');
const sendEmail = require('../service/sendEmail.service');
const PasswordReset = require('../models/resetPassword.models');
const User = require('../models/user.models');


exports.forgotPassword = async (req, res ) =>{
    try {
        const { email } = req.body;
        const emailExist = await User.findOne({ email })
        if(!emailExist){
            return res.status(404).send('User does not exist in our database')
        }    
        const tokenPass = crypto.randomBytes(12).toString('hex')

        const token = await PasswordReset.create({
            token: tokenPass,
            email: emailExist.email,
            userId: emailExist._id
        });
        const link = `${process.env.BASE_URL}/?password-reset/${token.token}`;
        await sendEmail({
            email: emailExist.email,
            subject: ` Requested Reset Password Successfully`,
            message: `<div>
                   <h1>Hello ${emailExist.firstName}</h1>
                   <h2>"Kindly click on the password reset link": ${link} </h2><br><br>
                   <p>If you did not request a password reset, please ignore this email.</p>
                   </div>`,
                   });
        return res.status(201).send('Password reset link has been sent to your email')
        
    } catch (error) {
        return res.status(500).send({
            error: error.message,
            message: "Internal server error"
        })
        
    }
};





exports.resetPassword = async (req, res)=>{
    try {
        const {email, password } = req.body;
        const existingEmail = await User.findOne({email})
        if(!existingEmail){
            return res.status(404).send('enter correct registered email')
        }
        const passwordChanged = await PasswordReset.findOne({ email })
        if(passwordChanged.token){
            return res.status(401).send("This link has been expired")
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const pass = await User.findOneAndUpdate({
            email : email,
        },
        {
            password: hashedPassword
        },
        {
            new: true
        }
        );
        res.status(200).send('Password reset was successful')
    } catch (error) {
        return res.status(500).send({ message: error.message })
    }
}



exports.userUpdatePassword = async (req, res)=>{
    try {
        const id = req.user;
        const existingEmail = await User.findOne({ id })
        if(existingEmail.roles === "user" || "admin" || "teacher"){
            const { password } = req.body;
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            const pass = await User.findOneAndUpdate(
                {
                    _id: id
                },
                {
                    password: hashedPassword
                },
                {
                    new: true
                }
                );
                return res.status(200).send('Password reset was successful')

        }
            } catch (error) {
        return res.status(500).send({ message: error.message })
    }
}