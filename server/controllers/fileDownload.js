var zip = require('express-zip');



exports.downloadFile = async (req, res) => {
    console.log(req.body.path);
    res.download("./"+req.body.path);
}

exports.downloadZip = (req, res) => {
    console.log(req.body);
    res.zip(req.body[33], 'attach.zip')
}