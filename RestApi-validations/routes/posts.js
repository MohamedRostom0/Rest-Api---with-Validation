//A route to test JWT auth is working

const express = require('express');
const router = express.Router();
const verify = require('./verifyToken');

router.get('/',verify, (req, res) => {
    res.send(req.user);
})

module.exports = router;