const express = require('express');
const  announcement_controller = require("../controllers/announcements.js");

const router = express.Router();

router.post('/', announcement_controller.updateInfo);
router.get('/', announcement_controller.getInfo);
router.put('/:id', announcement_controller.editInfo);

module.exports = router ;


