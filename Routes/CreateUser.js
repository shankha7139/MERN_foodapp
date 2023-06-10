const express = require('express')
const router = express.Router()
const User = require('../models/User')
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt  = require('jsonwebtoken');
const jwtsecret = "shakharishikhanbirlainstituteoftechnology123"

router.post("/createuser",
    body('email').isEmail(),
    body('name').isLength({ min: 5 }),
    body('password').isLength({ min: 5 })
    , async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const salt = await bcrypt.genSalt(10);
        let secPassword = await bcrypt.hash(req.body.password,salt)
        try {
            await User.create({
                name: req.body.name,
                location: req.body.location,
                password: secPassword,
                email: req.body.email
            })
            res.json({ success: true })

        } catch (err) {
            console.log(err)
            res.json({ success: false })
        }
    })


router.post("/loginuser",
    body('email').isEmail(),
    body('name').isLength({ min: 5 }),
    body('password').isLength({ min: 5 })
    , async (req, res) => {
        let email = req.body.email;
        const errors = validationResult(req);
        try {
            let userdata = await User.findOne({ email });
            if (!userdata) {
                return res.status(400).json({ errors: "thek se dalo details" })
            }
            const check = await bcrypt.compare(req.body.password,userdata.password)
            if (!check) {
                return res.status(400).json({ errors: "thek se dalo details" })
            }

            const data = {
                user:{
                    id:userdata.id
                }
            }

            const authtoken = jwt.sign(data,jwtsecret)

            return res.json({ success: true ,authtoken})

        } catch (err) {
            console.log(err)
            res.json({ success: false })
        }
    })



module.exports = router;