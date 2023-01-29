const mongoose = require('mongoose');

const infoSchema = {
    announcement: {
        type: String,
        required: true,
    },
    espaInfo: {
        type: String,
        required: true,
    },

    espaOpen: {
        type: Date,
        required: true,
    },

    espaDeadline: {
        type: Date,
        required: true,
    },

    privInfo: {
        type: String,
        required: true,
    },

    privOpen: {
        type: Date,
        required: true,
    },

    privDeadline: {
        type: Date,
        required: true,
    }
}

const Announcement = mongoose.model('Announcement',infoSchema);
module.exports = Announcement;