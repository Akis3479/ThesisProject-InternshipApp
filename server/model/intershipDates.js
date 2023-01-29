const mongoose = require('mongoose');

const datesSchema = {
    start: {
        type: Date,
        required: true,
    },

    end: {
        type: Date,
        required: true
    }
}

const IntershipDates = mongoose.model('IntershipDates', datesSchema);
module.exports = IntershipDates;