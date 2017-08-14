var router = require('express').Router();

router.use('/', require('./index/index'));
router.use('/list', require('./list/index'));

module.exports = router;
