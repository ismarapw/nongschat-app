const express = require('express');
const chatController = require('../controllers/chat')
const router = express.Router();

router.post('/send/:id', chatController.sendMsg);
router.get('/conversation/:id', chatController.getMsg);
router.get('/panel', chatController.getChatList);
router.put('/update/:id',  chatController.updateMsg);

module.exports = router;