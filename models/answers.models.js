const mongoose = require('mongoose');

const answerSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    nameOfSubject:{
        type:String,
        trim: true,
        required: true
    },
    questions: [{
        question: String, 
        options: [ String ], 
        answerPosition: String
    }]
});

module.exports = mongoose.model('Answer',answerSchema);

