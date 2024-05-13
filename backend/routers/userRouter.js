const bcrypt = require('bcrypt');
const express = require('express');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const User = require('../models/user');
const UserVerification = require('../models/userVerification');
const { error } = require('console');

const router = express.Router();

let transporter = nodemailer.createTransport({
    service:"gmail",
    auth: {
        user: 'livefootball.noreply@gmail.com',
        pass: 'ybixwlgrknlipuou'
    },
    tls: {
        rejectUnauthorized:false
    }
})

router.post("/register", async (req,res) => {
    try{
        const {username, email, phoneNumber, password} = req.body;
        const usernameExists = await User.findOne({username});
        if(usernameExists){
            return res.status(400).json({message : "Username already exists."});
        }
        const emailExists = await User.findOne({email});
        if(emailExists){
            return res.status(400).json({message : "Email already exists."});
        }
        const user = new User({
            username,
            email,
            phoneNumber,
            password
        });
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(user.password, salt);
        user.password = hashedPassword;
        await user.save();
        const verification = await UserVerification.create({
            userID: user._id,
            token: crypto.randomBytes(64).toString('hex'),
            createdAt: Date.now(),
            expiresAt: Date.now() + 21600000
        });
        const emailOptions = {
            from: process.env.AUTH_EMAIL,
            to: email,
            subject: "Account Verification",
            //Use `` for string interpolation
            html: `<h3>Welcome, ${user.username}!</p><p>Activate your account by clicking the link below:</h3><a href="http://${req.headers.host}/users/verify?token=${verification.token}">Verify Your Account</a>`
        };

        transporter.sendMail(emailOptions, function (error, info) {
            if (error) {
                console.log(error);
            }
            else {
                res.status(200).json({ message: "Email for verification has been sent.\nPlease check your inbox." });
            }
        });
    }
    catch(err){
        return res.status(500).json({message : err});
    }
});

router.get("/verify", async(req,res) => {
    try {
        const queryToken = req.query.token;
        const userVerification = await UserVerification.findOne({token: queryToken});
        if(userVerification){
            const user = await User.findOne({_id: userVerification.userID});
            if(user){
                user.verification = true;
                await user.save();
                await UserVerification.deleteOne({token: queryToken})
                res.redirect("http://localhost:3000/loginu")
            }
            else{
                res.status(500).json({message : "Email is not verified."});
            }   
        }
    } catch (error) {
        console.log(error);
    }
})

router.post("/loginu", async (req, res) => {
    try {
        const {username, password} = req.body;
        const userExists = await User.findOne({username});
        if(!userExists){
            return res.status(400).json({message : "There doesn't exist any account with this username."});
        }
        if(userExists.verified == false){
            return res.status(400).json({message : "You haven't verified your account. Please check your inbox for verification email."});
        }
        bcrypt.compare(password, userExists.password, async (err, data) => {
            if(err) {
                throw err;
            }
            if(data) {
                return res.status(200).json(req.body);
            }
            else {
                return res.status(400).json({message : "You entered wrong password."});
            }
        });
    } catch (error) {
        return res.status(500).json({message : err});
    }
});

router.post("/logine", async (req, res) => {
    try {
        const {email, password} = req.body;
        const userExists = await User.findOne({email});
        if(!userExists){
            return res.status(400).json({message : "There doesn't exist any account with this email."});
        }
        if(userExists.verified == false){
            return res.status(400).json({message : "You haven't verified your account. Please check your inbox for verification email."});
        }
        bcrypt.compare(password, userExists.password, async (err, data) => {
            if(err) {
                throw err;
            }
            if(data) {
                return res.status(200).json(req.body);
            }
            else {
                return res.status(400).json({message : "You entered wrong password."});
            }
        });
    } catch (error) {
        return res.status(500).json({message : err});
    }
});

module.exports = router;