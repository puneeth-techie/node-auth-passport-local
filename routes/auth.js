const router = require('express').Router();

//controller handler
const authController = require('../controllers/auth');

//routes
router.get('/login', authController.login);
router.post('/login', authController.loginPost);
router.get('/register', authController.register);
router.post('/register', authController.registerPost);
router.get('/logout', authController.logout);

module.exports = router;