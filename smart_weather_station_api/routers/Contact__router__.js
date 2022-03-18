const express = require('express');
const { contactUS } = require('../controllers/Contacts__controller__')

const router = express.Router()
router.post('/send', contactUS);

module.exports = {
    routes: router
}