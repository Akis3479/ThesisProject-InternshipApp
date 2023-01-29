const express = require('express');

const router = express.Router();

var auth = require("../controllers/user");


router.post('/', auth.createUser);
router.post('/login', auth.login);

module.exports = router;
