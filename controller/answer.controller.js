const User = require('../models/user.models');
const Answer = require('../models/answers.models');



exports.answerTaking = async(req, res)=>{
    try {
        const id = req.user;
        const {
                nameOfSubject,
                questions: [{
                    question,
                    options,
                    answerPosition
            }]} = req.body;
        const examiner = await User.findOne({ _id: id })
        if(examiner.roles == "user"){
            return res.status(401).send("You are not Authorized");
        }
        const examCreate = await Answer.create({
            userId: examiner._id,
            nameOfSubject,
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


