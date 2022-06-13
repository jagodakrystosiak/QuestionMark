const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AnswerSchema = new Schema({
    content: String,
    createdAt: {
        default: Date.now(),
        type: Date
    },
    editedAt: {
        default: new Date(0),
        type: Date
    },
    questionId: mongoose.ObjectId,
    userId: mongoose.ObjectId,
    userName: String
}, {
    timestapms: true
});

const Answer = mongoose.model('Answer', AnswerSchema);
module.exports = Answer;