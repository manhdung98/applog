
var mongoose = require('mongoose');
var LogSchema = mongoose.Schema({
    timeCreated: Number,

    system: {
        type: String,
        required: true
    },
    type: String,
    data:Object
});

var Log = module.exports = mongoose.model('log', LogSchema);
module.exports.get = function (callback,offset, limit) {
    Log.find(callback).limit(limit).skip(offset);
}