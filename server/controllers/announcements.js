const Announcements = require("../model/announcements.js");

exports.updateInfo = async (req, res) => {
    const announcement = req.body;
    const newAnnouncement = new Announcements(announcement);

    try {
        console.log(newAnnouncement);
        await newAnnouncement.save();
        res.status(201).json(newAnnouncement);
    } catch (err) {
        res.status(404)
    }
}

exports.getInfo = async (req, res) => {
    try {
        const allInfo = await Announcements.find();

        res.status(200).json(allInfo);
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}

exports.editInfo2 = async (req, res) => {
    try {
        const allInfo = await Announcements.find();
        const announcement = req.body;
        const newAnnouncement = new Announcements(announcement);

        await Announcements.updateOne({"_id": allInfo[0]._id}, newAnnouncement);
        res.status(201).json({
            message: 'Info updated successfully!'
        });

    } catch (error) {
        res.status(404).json({message: error.message});
    }
}

exports.editInfo = async (req, res) => {
    Announcements.findById(req.params.id, function(err, announcement){
        if (!announcement)
            res.status(404).send("data is not found");
        else
            announcement.announcement = req.body.announcement;
            announcement.espaInfo = req.body.espaInfo;
            announcement.espaOpen = req.body.espaOpen;
            announcement.espaDeadline = req.body.espaDeadline;
            announcement.privInfo = req.body.privInfo;
            announcement.privOpen = req.body.privOpen;
            announcement.privDeadline = req.body.privDeadline;

            announcement.save().then(announcement => {
                res.json('Annoouncements updated!');
            })
            .catch(err => {
                res.status(400).send("Update not possible");
            });
    });
}