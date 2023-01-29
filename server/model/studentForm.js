const mongoose = require('mongoose');

const studentSchema = mongoose.Schema({
    firstName :{
        type : String,
        required : true,
        trim : true
    },
    lastName : {
        type : String,
        required : true,
        trim : true
    },
    email :{
        type : String,
        required : true,
        trim: true
    },
    telephone : {
        type : String,
        required : true,
        trim: true,
    },
    semester : {
        type : Number,
        required : true
    },
    atlas1 : {
        type : Number,
        required : true,
        trim: true,
    },
    atlas2 : {
        type : Number,
        trim: true,
    },
    company1 : {
        type : String,
        required : true,
        trim : true
    },
    company2 : {
        type : String,
        trim : true
    },
    companyTel1 : {
        type : Number,
        trim : true
    },
    companyTel2 : {
        type : Number,
        trim : true
    },
    date1 : {
        type : Date,
        required : true
    },
    date2 : {
        type : Date
    },
    supervisor : {
        type : String,
    },
    protocolNum: {
        type : Number,

    },
    // transcript : {
    //         type : String,
    //         required : true,
    // },
    // disabilitiesApp : {
    //     type : String,
    // },
    // cv: {
    //     type : String,
    // },
    applicationType: {
        type: String,
        enum : ['espa','private'],
    },

})

const Student = mongoose.model('Student',studentSchema);
module.exports = Student;
