const router = require('express').Router();
const endcyptController = require('../controllers/EndcyptController');

router.get('/encrypt', endcyptController.renderEncrypt);
router.get('/decrypt', endcyptController.renderDecrypt);
router.post('/encrypt', endcyptController.encrypt);
router.post('/decrypt', endcyptController.decrypt);

module.exports = router;