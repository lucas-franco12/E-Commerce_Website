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

//Routes
<<<<<<< Updated upstream
=======
const productsRoute = require('./routes/products');
>>>>>>> Stashed changes
const cartRoute = require('./routes/cart');
const sellerRoute = require('./routes/dashboard');
const customerRoute = require('./routes/products');
const orderRoute = require('./routes/order');
<<<<<<< Updated upstream


//remove users route
app.use('/api/cart', cartRoute)
app.use('/api/dashboard', sellerRoute)
app.use('/api/products', customerRoute)
app.use('/api/orders', orderRoute)


=======
const userAuthRoute = require('./routes/userAuth');


app.use('/api/products', productsRoute) // add-product -> need 
app.use('/api/cart', cartRoute) // add userid
app.use('/api/orders', orderRoute) 
app.use('/api/signup', userAuthRoute); 
>>>>>>> Stashed changes

// Connect to the database
mongoose.connect(process.env.DB_URL)
  .then(() => console.log('Database connected'))
  .catch(err => console.error('Database connection error:', err));

app.get('/', (req, res) => {
  res.send('Backend is running');
});

app.listen(process.env.PORT || 8080, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT || 8080}`);
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../build', 'index.html'));
});