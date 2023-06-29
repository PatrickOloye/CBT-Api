const mongoose = require('mongoose');

const examSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    nameOfSubject:{
        type:String,
        trim: true,
        required: true
    },
    duration: {
        type: Number,
    },
    instruction:{
        type: String,
    },
    questions: [{
        question: String, 
        options: [String], 
        answerPosition: String
    }]
});

module.exports = mongoose.model('Exam',examSchema);

