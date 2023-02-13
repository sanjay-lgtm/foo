import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../model/User';
const { body, validationResult } = require('express-validator');

const router = express.Router();

const jwtSecret = "sjdnhfgghsdfdghsdvghcdsxcbjsdbcbsdjhcvsdhsjhjh"
// ----------signup----------------------------
router.post("/createuser", [
    body('email').isEmail(),
    body('username').isLength({ min: 5 }),
    body('password', 'minimum 5 character required').isLength({ min: 5 })],
    async (req, res) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const salt = await bcrypt.genSalt(10);
        let secPassword = await bcrypt.hash(req.body.password, salt)

        try {
            await User.create({
                username: req.body.username,
                location: req.body.location,
                email: req.body.email,
                password: secPassword
            })
            res.json({ success: true });

        } catch (error) {
            console.log(error);
            res.json({ success: false });

        }
    });

// -----------------Login--------------------------



router.post("/loginuser",
    [
        body('email').isEmail(),
        body('password', 'minimum 5 character required').isLength({ min: 5 })],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        let email = req.body.email;
        try {
            let userData = await User.findOne({ email });
            if (!userData) {
                return res.status(400).json({ errors: "Try Logging with correct Email" });
            }

            const pwdCompare = await bcrypt.compare(req.body.password, userData.password)
            if (!pwdCompare) {
                return res.status(400).json({ errors: "Try Logging with correct password" });
            }
            const data = {
                user: {
                    id: userData.id
                }
            }
            const authToken = jwt.sign(data,jwtSecret)
            return res.json({ success: true ,authToken:authToken});

        } catch (error) {
            console.log(error);
            res.json({ success: false });

        }
    });





export default router;