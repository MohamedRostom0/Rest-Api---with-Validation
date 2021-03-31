const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv/config');

//import routes
const authRoute = require('./routes/auth');
const postsRoute = require('./routes/posts');

//connect to database
mongoose.connect(process.env.DB_CONNECTION , { useNewUrlParser: true, useUnifiedTopology: true } , () => {
    console.log('Connected to DB');
});

//Middlewares
app.use(express.json());

//Route Middleware
app.use('/api/user',authRoute);
app.use('/api/posts', postsRoute);

app.listen(3000, () => console.log('Server running on port 3000'));