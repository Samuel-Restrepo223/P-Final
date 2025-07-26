require('dotenv').config(); 
const express = require('express');
const connectDB = require('./config/db.cjs');
const cors = require('cors');

const app = express();


connectDB();

app.use(express.json()); 
app.use(cors()); 

app.use('/api/auth', require('./routers/auth.cjs')); 
app.use('/api/admin', require('./routers/admin.cjs'));
app.use('/api/products', require('./routers/product.cjs'));

app.get('/', (req, res) => {
  res.send('API corriendo...');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));