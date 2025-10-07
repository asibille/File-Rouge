const express = require('express');
const router = express.Router();
const requireAuth = require('../Middleware/requireAuth');
const UserController = require('../Controller/UserController');
const ContactController = require('../Controller/ConctatController');

router.post('/auth/register', UserController.register);
router.post('/auth/login', UserController.login);

router.get('/contacts', requireAuth, ContactController.getAll);
router.post('/contacts', requireAuth, ContactController.create);
router.patch('/contacts/:id', requireAuth, ContactController.update);
router.delete('/contacts/:id', requireAuth, ContactController.delete);
module.exports = router;
