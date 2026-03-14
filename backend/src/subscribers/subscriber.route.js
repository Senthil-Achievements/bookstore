const express = require('express');
const { subscribe } = require('./subscriber.controller');
const router = express.Router();

router.post('/', subscribe);

module.exports = router;
