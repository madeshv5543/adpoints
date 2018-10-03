const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const campaignSchema = new Schema({
    title:{
        type: String,
        required: [true, 'Title should not be empty']
    },
    description: {
        type: String
    },
    category: {
        type: String
    },
    startdate : {
        type: String
    },
    enddate: {
        type: String
    },
    value: {
        type: Number
    },
    campaignImage: {
        type: String
    },
    user: {
        type: String
    },
    place: {
        type: String
    },
    sponser : {
        type: String
    },
    txhash: {
        type: String
    },
    created: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('User', userSchema);

