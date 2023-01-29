const Student = require("../model/studentForm.js");


exports.createSumbission = async (req, res) => {
    //console.log("body"+req.body);
    const student = req.body;
    const newStudent = new Student(student);

    try {
        console.log(newStudent);
        await newStudent.save();
        res.status(201).json(newStudent);
    } catch (err) {
        res.status(404)
    }
}

exports.getStudents = async (req, res) => {
    try {
        const allInfo = await Student.find();
        res.status(200).json(allInfo);
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}


exports.getApplication = async (req, res) => {
    try {
        const allInfo = await Student.find({email: req.body.email});
        console.log(allInfo)
        res.status(200).json(allInfo);
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}
