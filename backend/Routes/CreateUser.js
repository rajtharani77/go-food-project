import express from "express";
const router = express.Router();
import User from "../models/User.js";
import { body, validationResult } from "express-validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const user = User;

const jwtsecret="c8211757092956c20320a1251950d880";
router.post("/createuser", [
    body('email', 'plese entervalid email').isEmail(),
    body('password', 'password should have length greter than 5').isLength({ min: 5 })],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const salt= await bcrypt.genSalt(10);

        const secPassword= await bcrypt.hash(req.body.password,salt);
        try {
            await user.create({
                name: req.body.name,
                location: req.body.location,
                email: req.body.email,
                password: secPassword
            })

            res.json({ success: true });

        } catch (error) {

            console.log(error);
            res.json({ success: false });
        }
    })




router.post("/loginUser", [
    body('email', 'plese entervalid email').isEmail(),
    body('password', 'password should have length greter than 5').isLength({ min: 5 })], async (req, res) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        let email = req.body.email;
        try {

            let Useremail = await User.findOne({ email });

            if (!Useremail) {
                return res.status(400).json({ errors: "write correct credentials" });
            }
            
            const pwdCompare= await bcrypt.compare(req.body.password,Useremail.password)
            if ((!pwdCompare)) {
                return res.status(400).json({ errors: "write correct credentials" });
            }

            const data={
                user:{
                    id:Useremail.id
                }
            }

            const authToken= jwt.sign(data,jwtsecret);
            res.json({ success: true,authToken:authToken });

        } catch (error) {

            console.log(error);
            res.json({ success: false });
        }
    })

export default router;