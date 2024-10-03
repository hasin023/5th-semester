const router = require('express').Router();
const authController = require('../controllers/authController');

router.get('/register', authController.renderRegisterPage);
router.get('/login', authController.renderLoginPage);
router.post('/user-register', authController.registerUser);
router.post('/user-login', authController.loginUser);
router.get('/user-logout', authController.logoutUser);

module.exports = router;
