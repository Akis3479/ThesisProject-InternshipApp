const express = require('express');
const  intershipDates_controller = require("../controllers/intershipDates.js");

const router = express.Router();

router.post('/', intershipDates_controller.updateInfo);
router.get('/', intershipDates_controller.getInfo);
router.put('/:id', intershipDates_controller.editInfo);

module.exports = router ;