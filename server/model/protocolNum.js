const mongoose = require('mongoose');

const protocolShema = {
    espaProtocol : {
        type: Number,
        required: true,
    },

    privProtocol : {
        type: Number,
        required: true,
    }
}

const ProtocolNum = mongoose.model('ProtocolNum', protocolShema);
module.exports = ProtocolNum;
