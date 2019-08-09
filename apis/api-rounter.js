let router = require('express').Router();
router.get('/', function (req, res) {
    res.json({
        status: 'API Its Working',
        message: 'Welcome to RESTHub crafted with love!'
    });
});
var MainController = require('../controller/MainController');


router.route('/logs')
    .get(MainController.index)
    .post(MainController.new);
router.route('/logs/:log_id')
    .get(MainController.view)
    .patch(MainController.update)
    .put(MainController.update)
    .delete(MainController.delete);

let testController = require('../controller/testController');

router.route('/test')
    .get(testController.index)
     .post(testController.new);
    
module.exports = router;