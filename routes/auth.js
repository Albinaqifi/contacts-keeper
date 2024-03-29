const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jtw = require('jsonwebtoken');
const User = require('../models/User');
const config = require('config')
const auth = require('../middleware/auth');

/**
*   *route   GET    api/auth
*   *desc    Get logged in user
*   *desc    Private
 */
router.get('/', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user)
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error')
    }
});


/**
*   *route   POST    api/auth
*   *desc    Auth user & get token
*   *desc    Public
 */
router.post('/', [
    check('email', 'Please enter a valid Email!').isEmail(),
    check('password', 'Password is required!').exists()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;

    try {
        let user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ msg: "Inavlid credentials" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ msg: "Invalid credentials" });
        }

        const payload = {
            user: {
                id: user.id
            }
        }

        jtw.sign(payload, config.get('jwtSecret'), {
            expiresIn: 360000
        }, (err, token) => {
            if (err) throw err;
            res.json({ token })
        })

    } catch (err) {
        console.error(err.msg)
        res.status(500).send('Server error')
    }
});

module.exports = router;