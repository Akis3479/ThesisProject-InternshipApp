const ProtocolNum = require("../model/protocolNum.js");

exports.createProtocol = async (req, res) => {
    const protocol = req.body;
    const newProtocol = new ProtocolNum(protocol);

    try{
        console.log(newProtocol);
        await newProtocol.save();
        res.status(201).json(newProtocol);
    } catch(err){
        res.status(500)
    }
}

exports.getProtocol = async (req, res) => {
    
        ProtocolNum.findById("62c607743f434d7b7cce2fed", function(err,protocol){
        if (!protocol)
            {res.status(404).send("data is not found");}
        else{
            console.log(protocol)
            res.status(200).json(protocol);
        }
        })
    
}

exports.updateProtocol = async (req, res) => {
    ProtocolNum.findById("62c607743f434d7b7cce2fed", function(err, protocolNum){
        if (!protocolNum)
            {res.status(404).send("data is not found");}
        else
            protocolNum.espaProtocol = req.body.espaProtocol;
            protocolNum.privProtocol = req.body.privProtocol;

            protocolNum.save().then(protocolNum => {
                res.json('Protocol numbers updated');
            })
            .catch(err => {
                res.status(400).send("Update not possible")
            });
    });
}