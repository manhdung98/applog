var amqp = require('amqplib/callback_api');
var connectiona, channela;
amqp.connect('amqp://admin:topica123@42.112.28.161:5672', function(error0, connection) {
    if (error0) {
        throw error0;
    }
    connection.createChannel(function(error1, channel) {
        if (error1) {
            throw error1;
        }

        var queue = 'dungTM';

        channel.assertQueue(queue, {
            durable: false
        });
        // channel.sendToQueue(queue, Buffer.from(msg));
        channel.consume(queue, function(msg) {
            console.log(" [x] Received %s", msg.content.toString());
        }, {
            noAck: true
        });
        channela = channel;
    });
    
    connectiona = connection;
    // setTimeout(function() {
    //     connection.close();
    //     process.exit(0);
    // }, 500);
});
exports.index = function (req, res) {

}
exports.new = function (req, res) {
    let data1 ={timeCreated: req.body.timeCreated ? req.body.timeCreated : log.timeCreated,
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
    channela.sendToQueue('dungTM', Buffer.from(JSON.stringify(data1)));
    res.json({
        status: "success",
        message: "Contacts retrieved successfully"
        // data: logs
    });
}