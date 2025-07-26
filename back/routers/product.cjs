const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController.cjs');
const authMiddleware = require('../middleware/auth.cjs'); 

router.post('/', authMiddleware, productController.createProduct);

router.get('/', productController.getProducts);

router.get('/:id', productController.getProductById);

router.put('/:id', authMiddleware, productController.updateProduct);

router.delete('/:id', authMiddleware, productController.deleteProduct);

module.exports = router;