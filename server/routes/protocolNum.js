const express = require('express');
const protocolNumController = require('../controllers/protocolNum.js');

const router = express.Router();

router.post('/' , protocolNumController.createProtocol);
router.get('/get' , protocolNumController.getProtocol);
router.post('/update', protocolNumController.updateProtocol);

module.exports = router;