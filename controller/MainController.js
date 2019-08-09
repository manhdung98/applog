Logapp = require('../db/model/logModel');
exports.index = function (req, res) {
    let limit = req.query.limit ? parseInt(req.query.limit, 10) :20;
    let offset = req.query.offset ? parseInt(req.query.offset, 10) :0;
    Logapp.get(function (err, logs) {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        res.json({
            status: "success",
            message: "Contacts retrieved successfully",
            data: logs
        });
    },offset, limit);
};
exports.new = function (req, res) {
    let test = {
        timeCreated: req.body.timeCreated ? req.body.timeCreated : log.timeCreated,
        system: req.body.system,
        type: req.body.type,
        data: {
            username: req.body.username,
            brand: req.body.brand,
            systemVersion: req.body.systemVersion,
            uniqueId: req.body.uniqueId,
            deviceName: req.body.deviceName
        }
    }
    var log = new Logapp(test);

    log.save(function (err) {
    res.json({
            message: 'New log created!',
            data: log
        });
    });
};

exports.view = function (req, res) {
    Logapp.findById(req.params.log_id, function (err, log) {
        if (err)
            res.send(err);
        res.json({
            message: 'Log details loading..',
            data: log
        });
    });
};
exports.update = function (req, res) {
Logapp.findById(req.params.log_id, function (err, log) {
        if (err)
            res.send(err);
        log.timeCreated = req.body.timeCreated ? req.body.timeCreated : log.timeCreated;
        log.system = req.body.system;
        log.type = req.body.type;

        log.save(function (err) {
            if (err)
                res.json(err);
            res.json({
                message: 'Log Info updated',
                data: log
            });
        });
    });
};

exports.delete = function (req, res) {
    Logapp.remove({
        _id: req.params.log_id
    }, function (err, log) {
        if (err)
            res.send(err);
res.json({
            status: "success",
            message: 'Log deleted'
        });
    });
};