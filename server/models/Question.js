const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const QuestionSchema = new Schema({
    content: String,
    createdAt: {
        default: Date.now(),
        type: Date
    },
    userId: mongoose.ObjectId,
    userName: String
}, {
    timestapms: true
});

const Question = mongoose.model('Question', QuestionSchema);
module.exports = Question;