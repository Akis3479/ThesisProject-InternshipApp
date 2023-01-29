const express = require('express');
const ldapAuth = require('../controllers/ldap');

const router = express.Router();

router.post('/',ldapAuth.authenicateUser);

module.exports = router ;