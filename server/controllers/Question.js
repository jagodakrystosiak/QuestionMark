const express = require("express");
const { mongoose } = require("mongoose");
const router = express.Router();
const Question = require('../models/Question')
const protected = require('../middleware/Protected');

router.post('/create', protected, async (req,res) => {
    const question = Question({
        content: req.body.content,
        userId: req.body.userId,
        userName: req.body.userName
    });

    await question.save();
    res.send(question);
});

router.get('/', async (req,res) => {
    const questions = await Question.find(req.query);
    res.send(questions);
});

router.get('/:id', async (req,res) => {
    if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.sendStatus(404);
    }

    const question = await Question.findById(req.params.id);
    res.send(question);
});

router.get("/delete/:id", (req, res) => {
    Question.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect("/list")
        } else {
            console.log("Błąd podczas usuwania: " + err)
        }
    })
});

router.post("/update/:id", async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.sendStatus(404);
    }

    const question = await Question.findById(req.params.id);
    question.content = req.body.content;

    try{
        await question.save();
        res.sendStatus(200);
    } catch (e) {
        res.sendStatus(401).send({
            massage: "Update error"
        });
    }
});

module.exports = router;