const {Router} = require('express');
const router = Router();
const {getMessages,createMessage,removeMessage} = require('../controllers/messages');

router.get('/messages', getMessages);
router.post('/message/new', createMessage);
router.delete('/message/:id/remove', removeMessage);


module.exports = router