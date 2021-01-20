const { authCheck } = require('../middlewares/auth');
const router = require('express').Router();

//controller handler
const homeController = require('../controllers/home');

router.get('/', homeController.home);
router.get('/dashboard', authCheck, homeController.dashboard);

module.exports = router;