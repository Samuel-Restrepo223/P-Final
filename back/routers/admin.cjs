const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth.cjs');
const authorizeRole = require('../middleware/authorizeRole.cjs'); 
const adminController = require('../controllers/adminController.cjs'); 

router.get('/users', auth, authorizeRole(['admin']), adminController.getAllUsers);

router.delete('/users/:id', auth, authorizeRole(['admin']), adminController.deleteUser);

module.exports = router;