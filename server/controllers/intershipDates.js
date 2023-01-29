const IntershipDates = require("../model/intershipDates.js");

exports.updateInfo = async (req, res) => {
    const intershipDates = req.body;
    const newintershipDates = new IntershipDates(intershipDates);

    try {
        console.log(newintershipDates);
        await newintershipDates.save();
        res.status(201).json(newintershipDates);
    } catch (err) {
        res.status(404)
    }
}

exports.getInfo = async (req, res) => {
    try {
        const allInfo = await IntershipDates.find();
        console.log(allInfo)
        res.status(200).json(allInfo);
    } catch (error) {
        res.status(404).json({message: error.message});
    }

}

exports.editInfo = async (req, res) => {
    IntershipDates.findById(req.params.id, function(err, intershipDates){
        if (!intershipDates)
            res.status(404).send("data is not found");
        else
            intershipDates.start = req.body.start
            intershipDates.end = req.body.end;

            intershipDates.save().then(intershipDates => {
                res.json('Intership Dates updated!');
            })
            .catch(err => {
                res.status(400).send("Update not possible");
            });
    });

}