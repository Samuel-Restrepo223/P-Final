const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db.cjs'); 
const path = require('path'); 

dotenv.config({ path: './.env' }); 
connectDB(); 

const app = express();

app.use(cors({
  origin: 'http://localhost:4200', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json()); 

const authRoutes = require(path.join(__dirname, 'routers', 'auth.cjs'));
const productRoutes = require(path.join(__dirname, 'routers', 'product.cjs'));
const adminRoutes = require(path.join(__dirname, 'routers', 'admin.cjs'));


app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/admin', adminRoutes); 


app.get('/', (req, res) => {
  res.send('API corriendo...');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});