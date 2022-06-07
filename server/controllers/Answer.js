const express = require("express");
const { mongoose } = require("mongoose");
const router = express.Router();
const Answer = require('../models/Answer')
const protected = require('../middleware/Protected');

router.post('/create', protected, async (req, res) => {
    const answer = Answer({
        content: req.body.content,
        questionId: req.body.questionId,
        userId: req.body.userId,
        userName: req.body.userName,
    });

    await answer.save();
    res.send(answer);
});

router.get('/', async (req, res) => {
    const answer = await Answer.find(req.query);
    res.send(answer);
});

router.get('/:id', async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.sendStatus(404);
    }

    const answer = await Answer.findById(req.params.id);
    res.send(answer);
});

router.get("/delete/:id", (req, res) => {
    Answer.findByIdAndRemove(req.params.id, (err, doc) => {
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

    const answer = await Answer.findById(req.params.id);
    answer.content = req.body.content;

    try{
        await answer.save();
        res.sendStatus(200);
    } catch (e) {
        res.sendStatus(401).send({
            massage: "Update error"
        });
    }
});

module.exports = router;