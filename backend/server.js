const express = require('express');
const cors = require('cors');
const path = require('path'); 
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const morgan = require('morgan');
const mongoose = require('mongoose');

const app = express();
app.use(cors());
dotenv.config();

//Middleware
app.use(bodyParser.json());
app.use(morgan('tiny'));
app.use(express.static(path.join(__dirname, '../build')));
app.use((req, res, next) => {
  console.log(`Received request for ${req.url}`);
  next();
});

//Routes
const productsRoute = require('./routes/products');
const cartRoute = require('./routes/cart');
const orderRoute = require('./routes/order');
const userAuthRoute = require('./routes/userAuth');
const usersRoute = require('./routes/users');
const paymentRoutes = require('./routes/payments');

app.use('/api/products', productsRoute) 
app.use('/api/cart', cartRoute) 
app.use('/api/orders', orderRoute) 
app.use('/api', userAuthRoute)
app.use('/api/users', usersRoute);
app.use('/api', paymentRoutes);

// Connect to the database
mongoose.connect(process.env.DB_URL)
  .then(() => console.log('Database connected'))
  .catch(err => console.error('Database connection error:', err));

app.get('/', (req, res) => {
  res.send('Backend is running');
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../build', 'index.html'));
});

app.listen(process.env.PORT || 8080, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT || 8080}`);
});

