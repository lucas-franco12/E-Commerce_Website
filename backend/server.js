const express = require('express');
const cors = require('cors');
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

//Routes
const productsRoute = require('./routes/products');
const userRoute = require('./routes/users');
const cartRoute = require('./routes/cart');
const orderRoute = require('./routes/order');
const categoriesRoute = require('./routes/categories');
const authRoute = require('./routes/userAuth');
const sellerAuthRoute = require('./routes/sellerAuth');

app.use('/api/products', productsRoute)
app.use('/api/cart', cartRoute)
app.use('/api/orders', orderRoute)
app.use('/api/categories', categoriesRoute)
app.use('/api/users', userRoute)
app.use('/api/userAuth', authRoute)
app.use('/api/sellerAuth', sellerAuthRoute)

// Connect to the database
mongoose.connect(process.env.DB_URL)
  .then(() => console.log('Database connected'))
  .catch(err => console.error('Database connection error:', err));

app.get('/', (req, res) => {
  res.send('Backend is running');
});

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT || 5000}`);
});