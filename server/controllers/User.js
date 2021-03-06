const express = require("express");
const router = express.Router();
const { mongoose } = require("mongoose");

const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs');
const User = require("../models/User");

router.get('/init', async (req,res) => {
    const user = await User.findById(req.userId);

    res.send({user});
});

router.post('/register', async (req,res) => {
    const user = await User.findOne({email: req.body.email});
    if(user){
        return res.status(400).send({
            message: 'User with this email does not exist'
        });
    }

    const newUser = User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        role: 'user'
    });

    await newUser.save();

    return res.sendStatus(201);
});

router.post('/login', async (req,res) => {
    const user = await User.findOne({email: req.body.email});
    if(!user){
        return res.status(400).send({
            message: 'User with this email does not exist'
        });
    }

    const passwordIsEqual = await bcrypt.compare(req.body.password, user.password);
    if(!passwordIsEqual){
        return res.status(401).send({
            message: "Password is incorrect"
        });
    }

    const token = jwt.sign({userId: user._id}, 'app');

    res.send({
        user,
        token
    });
});

router.post("/change-name", async (req, res) => {
    const user = await User.findById(req.body.userId);

    user.name = req.body.name;
    await user.save();
    return res.sendStatus(200);
});

router.post("/change-email", async (req, res) => {
    const emailExists = await User.findOne({email: req.body.email});
    if(emailExists) {
        return res.status(401).send({
            massage: "This email is already taken"
        });
    }

    const user = await User.findById(req.body.userId);

    user.email = req.body.email;
    await user.save();
    return res.sendStatus(200);
});

router.post("/change-password", async (req, res) => {
    const user = await User.findById(req.body.userId);

    const passwordMatches = await bcrypt.compare(req.body.currentPassword, user.password);
    if(!passwordMatches) {
        return res.status(401).send({
            message: "Password is incorrect"
        });
    }

    user.password = req.body.password;
    await user.save();
    res.sendStatus(200);
});

router.get('/:id', async (req,res) => {
    if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.sendStatus(404);
    }

    const user = await User.findById(req.params.id);
    res.send(user);
});

router.get('/', async (req,res) => {
    const users = await User.find();
    res.send(users);
});

module.exports = router;