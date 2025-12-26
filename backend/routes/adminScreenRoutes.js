const express = require('express');
const { createScreen } = require('../controllers/screenController');
const { protectAdmin } = require('../middleware/adminAuth');

const router = express.Router();

router.use(protectAdmin);

router.post('/', createScreen);

module.exports = router;