const express = require('express');
const {upload} = require('../helpers/filehelper.js');
const createSumbission = require("../controllers/student.js");
const {singleFileUpload, multipleFileUpload, getallSingleFiles, getallMultipleFiles} = require('../controllers/fileUploader');




const router = express.Router();


//router.post('/',upload.single('file'),createSumbission.createSumbission);
//export default router.post('/', createSumbission);

router.post('/', createSumbission.createSumbission);
router.get('/', createSumbission.getStudents)
router.post('/singleFile', upload.single('file'), singleFileUpload);
router.post('/multipleFiles', upload.array('files'), multipleFileUpload);
router.get('/getSingleFiles', getallSingleFiles);
router.get('/getMultipleFiles', getallMultipleFiles);
router.post('/getApplication', createSumbission.getApplication);



module.exports = router ;

