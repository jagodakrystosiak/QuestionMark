const express = require("express");
const { mongoose } = require("mongoose");
const router = express.Router();
const Answer = require('../models/Answer')
const protected = require('../middleware/Protected');

router.post('/create', protected, async (req,res) => {
    const answer = Answer({
        content: req.body.content,
        questionId: req.body.questionId,
        userId: req.body.userId,
        userName: req.body.userName,
    });

    await answer.save();
    res.send(answer);
});

router.get('/', async (req,res) => {
    const answer = await Answer.find();
    res.send(answer);
});

router.get('/:id', async (req,res) => {
    if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.sendStatus(404);
    }

    const answer = await Answer.findById(req.params.id);
    res.send(answer);
});

module.exports = router;