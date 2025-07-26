const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController.cjs'); 

console.log('auth.cjs cargado. Definición de rutas:'); // AGREGAR ESTA LÍNEA
console.log('POST /register', authController.register); // AGREGAR ESTA LÍNEA

router.post('/register', authController.register);

router.post('/login', authController.login);

module.exports = router;