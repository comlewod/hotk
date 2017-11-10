var router = require('express').Router();

router.use('/', require('./index/index'));
router.use('/list', require('./list/index'));
router.use('/back', require('./back/index'));
router.use('/upload', require('./upload/index'));
router.use('/image', require('./image'));

module.exports = router;
