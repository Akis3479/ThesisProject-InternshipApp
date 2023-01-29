const express = require('express');
const fileDownload_controller = require('../controllers/fileDownload.js');

const router = express.Router();
router.post('/', fileDownload_controller.downloadFile);
router.post('/zip', fileDownload_controller.downloadZip);

module.exports = router;

