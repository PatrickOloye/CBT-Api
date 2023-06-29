const User = require('../models/user.models');
const Exam = require('../models/exams.models');
const Answer = require('../models/answers.models');




exports.adminCreateExams = async(req, res)=>{
    try {
        const id = req.user;
        const examiner = await User.findOne({ _id: id })
        if(examiner.roles !== ("admin" && "superadmin")){
            return res.status(401).send("You are not Authorized");
        }
        const {
                nameOfSubject,
                duration,
                instruction,
                questions: [{
                    question,
                    options,
                    answerPosition
            }]} = req.body;
        const examCreate = await Exam.create({
            userId: examiner._id,
            nameOfSubject,
            duration,
            instruction,
            questions: [{
                question,
                options,
                answerPosition
            }]
        })
        return res.status(201).send(examCreate); 
        
    } catch (error) {
      return res.status(501).send({
        error: error.message
      })  
    }
}


exports.adminGetExams = async(req, res)=>{
    try {
        const id = req.user;
        const examiner = await User.findOne({ _id: id })
        if(examiner.roles !== ("admin" || "superadmin")){
            return res.status(401).send("You are not Authorized");
        }
        const exams = await Exam.find({ })
        .sort({ createdAt: -1 })
        .populate('userId')
        .populate('questions.options.answerPosition')
        .limit(20)
        return res.status(200).send(exams);
    } catch (error) {
      return res.status(501).send({
        error: error.message
      })  
    }
}


exports.adminGetExamsBySubject = async(req, res)=>{
    try {
        const id = req.user;
        const examiner = await User.findOne({ _id: id })
        if(examiner.roles !== ("admin" || "superadmin")){
            return res.status(401).send("You are not Authorized");
        }
        const exams = await Exam.find({ nameOfSubject: req.params.subject })
        .sort({ createdAt: -1 })
        .populate('userId')
        .populate('questions.options.answerPosition')
        .limit(20)
        return res.status(200).send(exams);
    } catch (error) {
      return res.status(501).send({
        error: error.message
      })  
    }
}


// admin view users 

exports.adminViewUser = async(req, res)=>{
    try {
        const id = req.user;
        const examiner = await User.findOne({ _id: id })
        if(examiner.roles !== ("admin" || "superadmin")){
            return res.status(401).send("You are not Authorized");
        }
        const user = await User.find({})
        .sort({ createdAt: -1 })
        .populate('firstName')
        .populate('username')
        .populate('email')
        .limit(10)
        return res.status(200).send(user);
    } catch (error) {
      return res.status(501).send({
        error: error.message
      })
    }
}


// admin update exam 

exports.adminUpdateExam = async(req, res)=>{
    try {
        const id = req.user;
        const examiner = await User.findOne({ _id: id })
        if(examiner.roles !== "superadmin"){
            return res.status(401).send("You are not Authorized");
        }
        const {
                nameOfSubject,
                duration,
                instruction,
                questions: [{
                    question,
                    options,
                    answerPosition
            }]} = req.body;
        const examUpdate = await Exam.findByIdAndUpdate({ nameOfSubject }, {    
            nameOfSubject,
            duration,
            instruction,
            questions: [{
                question,
                options,
                answerPosition
            }]
        })
        return res.status(200).send(examUpdate);
    } catch (error) {
      return res.status(501).send({
        error: error.message
      })  
    }
}


// admin view user by username

exports.adminViewUserByUsername = async(req, res)=>{
    try {
        const id = req.user;
        const examiner = await User.findOne({ _id: id })
        if(examiner.roles !== ("admin" || "superadmin")){ 
            return res.status(401).send("You are not Authorized");
        }
        const user = await User.findOne({ username: req.params.username })        
        return res.status(200).send(user);
    } catch (error) {
      return res.status(501).send({
        error: error.message
      })  
    }
}


// admin delete exam

exports.adminDeleteExam = async(req, res)=>{
    try {
        const id = req.user;
        const examiner = await User.findOne({ _id: id })
        if(examiner.roles !== "superadmin"){
            return res.status(401).send("You are not Authorized");
        }
        const examDelete = await Exam.findOneAndDelete({ nameOfSubject: req.params.nameOfSubject })
        return res.status(200).send(examDelete);
    } catch (error) {
      return res.status(501).send({ 
        error: error.message
      })  
    }
}


// admin update the user roles 

exports.adminUpdateUserRoles = async(req, res)=>{
    try {
        const id = req.user;
        const examiner = await User.findOne({ _id: id })
        if(examiner.roles !== "superadmin") {
            return res.status(401).send("You are not Authorized");
        }
        const { username } = req.body;
        const user = await User.findOne({ username: username })
        const userUpdate = await User.findByIdAndUpdate(
            {
                 _id: user._id 
            }, 
            { 
                $set: { roles: "admin"  }
            })
        return res.status(200).send(userUpdate);
    } catch (error) {
      return res.status(501).send({ 
        error: error.message
      })  
    }
}


// admin view all the answer 

exports.adminViewAllAnswer = async(req, res)=>{
    try {
        const id = req.user;
        const examiner = await User.findOne({ _id: id })
        if(examiner.roles !== ("admin" || "superadmin")){
            return res.status(401).send("You are not Authorized");
        }
        const answer = await Answer.find({})
        .sort({ createdAt: -1 })
        .populate('userId')
        .populate('questionId')
        .populate('options.answerPosition')
        .limit(20)
        return res.status(200).send(answer);
    } catch (error) {
      return res.status(501).send({ 
        error: error.message
      })  
    }
}


// admin  can view all the answer by username

exports.adminViewAllAnswerByUsername = async(req, res)=>{
    try {
        const id = req.user;
        const examiner = await User.findOne({ _id: id })
        if(examiner.roles !== ("admin" || "superadmin")){
            return res.status(401).send("You are not Authorized");
        }
        const answer = await Answer.find({ username: req.params.username })
        .sort({ createdAt: -1 })
        .populate('userId')
        .populate('questionId')
        .populate('options.answerPosition')
        .limit(10)
        return res.status(200).send(answer);
    } catch (error) {
      return res.status(501).send({
        error: error.message
      })  
    }
}